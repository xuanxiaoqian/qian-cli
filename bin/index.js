#!/usr/bin/env node

const program = require("commander"); //cmd控制

const download = require("download-git-repo"); //拉取github项目
const fs = require("fs");
const ora = require("ora"); //进度条
const chalk = require("chalk"); //给提示文案着色

// 提示样式
const success = chalk.blueBright;
const error = chalk.bold.red;

let projectName = "";

const templateUrl =
  //   "direct:https://github.com/xuanxiaoqian/vue3-project-template.git"; //github项目地址
  "direct:https://gitee.com/xuanxiaoqian/vue3-project-template.git"; //gitee项目地址

program.command("init <name>").action((content) => {
  projectName = content;

  const spinner = ora("正在初始化Vue3项目...").start(); //开启进度条
  download(templateUrl, projectName, { clone: true }, function (err) {
    if (!err) {
      spinner.succeed(success("初始化完成!"));
      console.log();
      console.log(success("现在运行:"));
      console.log();
      console.log(success("  cd " + projectName));
      console.log(success("  npm install"));
      console.log(success("  npm run dev"));

      // 更改 package.json 中的  name 和版本号
      changePackage();
    } else {
      console.log(err);
      spinner.fail("拉取失败");
    }
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
