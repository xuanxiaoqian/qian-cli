#!/usr/bin/env node

const program = require("commander"); //cmd控制
const inquirer = require("inquirer"); // 询问
const ora = require("ora"); //进度条
const chalk = require("chalk"); //给提示文案着色

const fs = require("fs"); // 操作文件
const path = require("path"); // 获得路径
const ejs = require("ejs"); //  模板初始化
const download = require("download-git-repo"); //拉取github项目
var adm_zip = require("adm-zip"); // 解压文件
const downloadServer = require("download"); // 下载服务器模板

// 提示样式
const success = chalk.blueBright;
const red = chalk.red;

let projectName = ""; // 项目名
let utilsList = []; // 选择的工具

const templateUrl =
  "direct:https://gitee.com/xuanxiaoqian/vue3-project-template.git"; //gitee项目地址
// const templateUrl =  "direct:https://github.com/xuanxiaoqian/vue3-project-template.git"; //github项目地址

let ServerUrl = "http://xuanxiaoqian.com:8001/Blog/vue3-project-template.zip";

const question = [
  {
    type: "checkbox",
    message: "选择你需要的工具,空格选择,选择完成请按回车",
    name: "utils",
    choices: [
      {
        value: "pinia",
        name: "pinia",
        checked: true,
      },
      {
        value: "prettier",
        name: "prettier",
        checked: true,
      },
    ],
  },
];

if (!process.argv.slice(2).length) {
  console.log(red("可以输入: qian-cli init xxx 来初始化你的项目"));

  return false;
}

program.command("init <name>").action((content) => {
  projectName = content;

  if (fs.existsSync(`${process.cwd()}/${projectName}`)) {
    console.log(red(`${projectName} 目录已经存在!!!`));
    return false;
  }

  inquirer.prompt(question).then((answer) => {
    utilsList = answer.utils;

    const spinner = ora("正在初始化Vue3项目...").start(); //开启进度条

    download(templateUrl, projectName, { clone: false }, function (err) {
      if (!err) {
        // 更改 package.json 中的  name 和版本号
        changePackage();

        spinner.succeed(success("初始化完成!"));
        console.log();
        console.log(success("现在运行:"));
        console.log();
        console.log(success("  cd " + projectName));
        console.log(success("  npm install"));
        console.log(success("  npm run dev"));
      } else {
        console.log("本地未有Git环境,正在向服务器拉取");

        (async () => {
          let data = await downloadServer(ServerUrl);
          await fs.promises.writeFile(
            `${process.cwd()}/vue3-project-template.zip`,
            data
          );

          var unzip = new adm_zip(
            path.join(process.cwd(), "vue3-project-template.zip")
          );
          await unzip.extractAllTo(`${process.cwd()}`, true);
          await fs.rename(
            path.join(process.cwd(), "vue3-project-template"),
            `${projectName}`,
            function (err) {
              // console.log(err);
            }
          );

          await deleteFile(
            path.join(process.cwd(), "vue3-project-template.zip")
          );

          // 更改 package.json 中的  name 和版本号
          await changePackage();
        })();

        spinner.succeed(success("初始化完成!"));
        console.log();
        console.log(success("现在运行:"));
        console.log();
        console.log(success("  cd " + projectName));
        console.log(success("  npm install"));
        console.log(success("  npm run dev"));
      }
    });
  });
});

program.parse();

// 替换模板package.json文件的name字段
const changePackage = () => {
  fs.readFile(`${process.cwd()}/${projectName}/package.json`, (err, data) => {
    if (err) throw err;
    let _data = JSON.parse(data.toString());
    _data.name = projectName;
    _data.version = "1.0.0";

    if (utilsList.indexOf("pinia") === -1) {
      delete _data.dependencies.pinia;

      removeDir(`${process.cwd()}/${projectName}/src/store`);

      // 模版文件目录
      const destUrl = path.join(__dirname, "templates");

      // 生成文件目录
      // process.cwd() 对应控制台所在目录
      const cwdUrl = `${process.cwd()}/${projectName}/src`;
      // 从模版目录中读取文件
      fs.readdir(destUrl, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          // 使用 ejs 渲染对应的模版文件
          // renderFile（模版文件地址，传入渲染数据）
          ejs
            .renderFile(path.join(destUrl, file), {
              pinia: "",
              usePinia: "",
              impPinia: "",
            })
            .then((data) => {
              // 生成 ejs 处理后的模版文件
              fs.writeFileSync(path.join(cwdUrl, file), data);
            });
        });
      });
    }

    if (utilsList.indexOf("prettier") === -1) {
      delete _data.dependencies.prettier;

      deleteFile(`${process.cwd()}/${projectName}/.prettierrc`);
    }

    let str = JSON.stringify(_data, null, 4);
    fs.writeFile(
      `${process.cwd()}/${projectName}/package.json`,
      str,
      function (err) {
        if (err) throw err;
      }
    );
  });
};

/**
 * 删除目录及目录下所有的文件
 * @param {string} p (需要删除文件夹的地址)
 */

function removeDir(p) {
  let statObj = fs.statSync(p); // fs.statSync同步读取文件状态，判断是文件目录还是文件。
  if (statObj.isDirectory()) {
    //如果是目录
    let dirs = fs.readdirSync(p); //fs.readdirSync()同步的读取目标下的文件 返回一个不包括 '.' 和 '..' 的文件名的数组['b','a']
    dirs = dirs.map((dir) => path.join(p, dir)); //拼上完整的路径
    for (let i = 0; i < dirs.length; i++) {
      // 深度 先将儿子移除掉 再删除掉自己
      removeDir(dirs[i]);
    }
    fs.rmdirSync(p); //删除目录
  } else {
    fs.unlinkSync(p); //删除文件
  }
}

/**
 * @param { delPath：String } （需要删除文件的地址）
 * @param { direct：Boolean } （是否需要处理地址）
 */
function deleteFile(delPath, direct = false) {
  delPath = direct ? path.join(__dirname, delPath) : delPath;
  try {
    /**
     * @des 判断文件或文件夹是否存在
     */
    if (fs.existsSync(delPath)) {
      fs.unlinkSync(delPath);
    } else {
      console.log("inexistence path：", delPath);
    }
  } catch (error) {
    console.log("del error", error);
  }
}
