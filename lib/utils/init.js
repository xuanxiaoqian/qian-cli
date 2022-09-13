var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var init_exports = {};
__export(init_exports, {
  Tips: () => Tips,
  checkName: () => checkName,
  render: () => render,
  selectFeature: () => selectFeature
});
module.exports = __toCommonJS(init_exports);
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_clear_console = __toESM(require("clear-console"));
var import_kolorist = require("kolorist");
var import_inquirer = __toESM(require("inquirer"));
var import_ora = __toESM(require("ora"));
var import_common = __toESM(require("./common"));
function checkName(name) {
  const inCurrent = name === ".";
  const projectName = inCurrent ? import_path.default.relative("../", process.cwd()) : name;
  const projectPath = inCurrent ? import_path.default.join(process.cwd(), name) : import_path.default.join(process.cwd(), projectName);
  if (import_fs.default.existsSync(projectPath) && !inCurrent) {
    console.log((0, import_kolorist.red)(`${projectPath} \u5B58\u5728`));
    process.exit(1);
  }
  return { projectPath, isCwd: inCurrent ? true : false };
}
function selectFeature() {
  return __async(this, null, function* () {
    (0, import_clear_console.default)();
    console.log((0, import_kolorist.blue)(`\u5F53\u524D\u811A\u624B\u67B6\u7248\u672C v${import_common.currentPackageJson.version}`));
    console.log("\u5F00\u59CB\u521D\u59CB\u5316\u9879\u76EE:");
    console.log("");
    const question = [
      {
        type: "checkbox",
        message: "\u9009\u62E9\u4F60\u9700\u8981\u7684\u5DE5\u5177,\u7A7A\u683C\u9009\u62E9,\u56DE\u8F66\u5B8C\u6210",
        name: "feature",
        choices: [
          {
            value: "axios",
            name: "axios",
            checked: true
          },
          {
            value: "pinia",
            name: "pinia",
            checked: true
          },
          {
            value: "scss",
            name: "scss",
            checked: true
          },
          {
            value: "prettier",
            name: "prettier",
            checked: true
          },
          {
            value: "TSX",
            name: "TSX",
            checked: false
          }
        ]
      }
    ];
    let answer = yield import_inquirer.default.prompt(question);
    return answer.feature;
  });
}
function render(projectPath, feature) {
  return __async(this, null, function* () {
    const spinner = (0, import_ora.default)("\u6B63\u5728\u521D\u59CB\u5316Vue3\u9879\u76EE...").start();
    let templatePath = import_path.default.join(__dirname, "../", "template");
    renderTemplate(import_path.default.join(templatePath, "base"), projectPath);
    feature.map((item) => {
      renderTemplate(import_path.default.join(templatePath, "code", item), projectPath);
    });
    let _data = (0, import_common.readJsonFile)(import_path.default.join(projectPath, "package.json"));
    _data.name = import_path.default.basename(projectPath);
    _data.version = "1.0.0";
    let str = JSON.stringify(_data, null, 4);
    import_fs.default.writeFileSync(import_path.default.join(projectPath, "package.json"), str);
    let succendMsg = (0, import_kolorist.green)("\u521D\u59CB\u5316\u5B8C\u6210") + "  \u5982\u9700\u4F7F\u7528create\u547D\u4EE4\u8BF7\u52A1\u5FC5\u67E5\u770B\u5B98\u65B9\u6587\u6863  " + (0, import_kolorist.lightRed)("https://qian-cli.xuanxiaoqian.com/configDoc/createConfig/guide.html");
    spinner.succeed(succendMsg);
  });
}
function renderTemplate(src, dest) {
  const stats = import_fs.default.statSync(src);
  if (stats.isDirectory()) {
    if (import_path.default.basename(src) === "node_modules") {
      return;
    }
    if (import_path.default.basename(src) === "root") {
      return;
    }
    import_fs.default.mkdirSync(dest, { recursive: true });
    for (const file of import_fs.default.readdirSync(src)) {
      renderTemplate(import_path.default.resolve(src, file), import_path.default.resolve(dest, file));
    }
    return;
  }
  const filename = import_path.default.basename(src);
  if (filename === "package.json" && import_fs.default.existsSync(dest)) {
    const existing = JSON.parse(import_fs.default.readFileSync(dest, "utf8"));
    const newPackage = JSON.parse(import_fs.default.readFileSync(src, "utf8"));
    const pkg = (0, import_common.default)((0, import_common.deepMerge)(existing, newPackage));
    import_fs.default.writeFileSync(dest, JSON.stringify(pkg, null, 2) + "\n");
    return;
  }
  if (filename.startsWith("_")) {
    dest = import_path.default.resolve(import_path.default.dirname(dest), filename.replace(/^_/, "."));
  }
  import_fs.default.copyFileSync(src, dest);
}
function Tips(projectName, isCwd) {
  console.log();
  console.log((0, import_kolorist.green)("\u73B0\u5728\u8FD0\u884C:"));
  console.log();
  if (!isCwd)
    console.log((0, import_kolorist.green)("  cd " + projectName));
  console.log((0, import_kolorist.green)("  npm install"));
  console.log((0, import_kolorist.green)("  npm run dev"));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tips,
  checkName,
  render,
  selectFeature
});
