var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var devService_exports = {};
__export(devService_exports, {
  default: () => devService
});
module.exports = __toCommonJS(devService_exports);
const chokidar = require("chokidar");
const path = require("path");
const fs = require("fs");
const esbuild = require("esbuild");
const fork = require("child_process").fork;
function devService() {
  let filesPathArr = [];
  function copyFile(basePath, originPath, targetPath) {
    let rootPath = basePath.split(originPath)[0];
    let truePath = basePath.split(originPath)[1];
    if (!fs.existsSync(path.join(rootPath, targetPath))) {
      fs.mkdirSync(path.join(rootPath, targetPath));
    }
    let a = truePath.split("\\");
    a.shift();
    a.pop();
    a.map((item) => {
      if (!fs.existsSync(path.join(rootPath, targetPath, item))) {
        fs.mkdirSync(path.join(rootPath, targetPath, item));
      }
    });
    fs.copyFileSync(basePath, path.join(rootPath, targetPath, truePath));
  }
  function getFiles(dir) {
    const stat = fs.statSync(dir);
    if (stat.isDirectory()) {
      const dirs = fs.readdirSync(dir);
      dirs.forEach((value) => {
        getFiles(path.join(dir, value));
      });
    } else if (stat.isFile()) {
      if (path.extname(dir) !== ".ts" && path.extname(dir) !== ".js") {
        copyFile(dir, "src", "lib");
      } else {
        filesPathArr.push(dir);
      }
    }
  }
  function removeDir(filePath) {
    let statObj = fs.statSync(filePath);
    if (statObj.isDirectory()) {
      let dirs = fs.readdirSync(filePath);
      dirs = dirs.map((dir) => path.join(filePath, dir));
      for (let i = 0; i < dirs.length; i++) {
        removeDir(dirs[i]);
      }
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }
  getFiles(path.join(process.cwd(), "./src"));
  console.log(path.join(process.cwd(), "./src"));
  esbuild.build({
    entryPoints: [...filesPathArr],
    bundle: false,
    outdir: "lib",
    platform: "node",
    format: "cjs",
    target: "node14",
    plugins: []
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  });
  let appService = fork(path.join(process.cwd(), "lib/index.js"));
  appService.on("error", (err) => {
    console.log(err);
    process.exit(0);
  });
  appService.on("message", () => {
    console.log("\u670D\u52A1\u542F\u52A8\u6210\u529F\uFF01\uFF01\uFF01");
  });
  chokidar.watch("src").on("unlink", (event) => {
    console.log(event.split("src")[1].split(".ts")[0] + ".js");
    if (path.extname(event) !== ".ts" && path.extname(event) !== ".js") {
      if (fs.existsSync(path.join("lib", event.split("src")[1]))) {
        fs.unlinkSync(path.join("lib", event.split("src")[1]));
      }
    } else {
      if (fs.existsSync(
        path.join("lib", event.split("src")[1].split(".ts")[0] + ".js")
      )) {
        fs.unlinkSync(
          path.join("lib", event.split("src")[1].split(".ts")[0] + ".js")
        );
      }
    }
  });
  chokidar.watch("src").on("unlinkDir", (event) => {
    if (fs.existsSync(path.join("lib", event.split("src")[1]))) {
      removeDir(path.join("lib", event.split("src")[1]));
    }
  });
  chokidar.watch("src").on("add", (event) => {
    if (path.extname(event) !== ".ts" && path.extname(event) !== ".js") {
      copyFile(path.resolve(event), "src", "lib");
    } else {
      require("esbuild").build({
        entryPoints: [event],
        bundle: false,
        outfile: "lib" + event.split("src")[1].split(".ts")[0] + ".js",
        platform: "node",
        format: "cjs",
        target: "node14",
        plugins: []
      }).catch((err) => {
        console.log(err);
        process.exit(1);
      });
    }
  });
  chokidar.watch("src").on("addDir", (event) => {
    if (!fs.existsSync(path.join("lib", event.split("src")[1]))) {
      fs.mkdirSync(path.join("lib", event.split("src")[1]));
    }
  });
  chokidar.watch("src").on("change", (event, path2) => {
    appService.kill();
    require("esbuild").build({
      entryPoints: [event],
      bundle: false,
      outfile: "lib" + event.split("src")[1].split(".ts")[0] + ".js",
      platform: "node",
      format: "cjs",
      target: "node14",
      plugins: []
    }).catch((err) => {
      console.log(err);
      process.exit(1);
    });
    appService = fork("lib/index.js");
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
