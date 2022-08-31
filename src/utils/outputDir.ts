/**
 * 用于输出文件夹目录结构,本项目未安装依赖。
 */

import path from "path";

const fs = require("fs");
const tree = require("tree-node-cli");

// 当前命令行的工作目录
const cwd = process.cwd();
let config = {
  build: {
    // 打印所有文件。默认情况下，tree 不打印隐藏文件（以点开头的文件）
    allFiles: false,
    // 在文件之前列出目录
    dirsFirst: false,
    // 仅列出目录
    dirsOnly: false,
    // 用于测试每个文件名的正则表达式数组。匹配的文件将被排除，匹配的目录不会被遍历
    exclude: [/node_modules/, /.git/, /tree.md/],
    // 目录树的最大显示深度
    maxDepth: Number.POSITIVE_INFINITY,
    // 以相反的字母顺序对输出进行排序
    reverse: false,
    // 在目录后面附加一个斜杠
    trailingSlash: false,
    readPath: path.join(__dirname, "../", "template", "base"),
    exportPath: "dirTree.txt",
  },
};

try {
  const loadConfig = require(`${cwd}\\treedir.config.js`);
  config = Object.assign({}, config, loadConfig);
} catch (error) {
  console.log(error);
}
const string = tree(config.build.readPath, config.build);
fs.writeFileSync(config.build.exportPath, string);
