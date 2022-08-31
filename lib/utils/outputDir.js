var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_path = __toESM(require("path"));
const fs = require("fs");
const tree = require("tree-node-cli");
const cwd = process.cwd();
let config = {
  build: {
    allFiles: false,
    dirsFirst: false,
    dirsOnly: false,
    exclude: [/node_modules/, /.git/, /tree.md/],
    maxDepth: Number.POSITIVE_INFINITY,
    reverse: false,
    trailingSlash: false,
    readPath: import_path.default.join(__dirname, "../", "template", "base"),
    exportPath: "dirTree.txt"
  }
};
try {
  const loadConfig = require(`${cwd}\\treedir.config.js`);
  config = Object.assign({}, config, loadConfig);
} catch (error) {
  console.log(error);
}
const string = tree(config.build.readPath, config.build);
fs.writeFileSync(config.build.exportPath, string);
