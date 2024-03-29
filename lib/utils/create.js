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
var create_exports = {};
__export(create_exports, {
  checkConfigJson: () => checkConfigJson,
  createChildren: () => createChildren,
  createModule: () => createModule,
  createRootRouter: () => createRootRouter,
  createRouter: () => createRouter,
  createStore: () => createStore,
  selectModule: () => selectModule
});
module.exports = __toCommonJS(create_exports);
var import_path = __toESM(require("path"));
var import_ejs = __toESM(require("ejs"));
var import_fs = __toESM(require("fs"));
var import_inquirer = __toESM(require("inquirer"));
var import_shelljs = __toESM(require("shelljs"));
var import_common = require("./common");
var import_kolorist = require("kolorist");
const checkConfigJson = () => {
  if (!((0, import_common.qianCliJson)() ?? false)) {
    console.log((0, import_kolorist.red)(`\u672A\u627E\u5230 ${import_path.default.join(process.cwd(), "qian-cli.json")}`));
    process.exit(1);
  }
};
async function selectModule() {
  const question = [
    {
      type: "list",
      message: "\u8BF7\u9009\u62E9\u8981\u521B\u5EFA\u4EC0\u4E48\u6A21\u5757",
      name: "module",
      choices: ["router", "store"]
    }
  ];
  let answer = await import_inquirer.default.prompt(question);
  return answer.module;
}
function createModule(moduleStr, moduleName) {
  if (moduleName.split("/").length > 1) {
    createRouter(moduleName);
    return;
  }
  if (moduleStr == "router") {
    createRouter(moduleName);
  } else if (moduleStr == "store") {
    createStore(moduleName);
  }
}
function createRouter(moduleName) {
  let mdName = moduleName.split("/").filter((str) => !!str);
  if (mdName.length > 2) {
    console.log((0, import_kolorist.red)("\u5F53\u524D\u6700\u591A\u53EA\u80FD\u652F\u6301\u4E8C\u7EA7\u8DEF\u7531,\u62B1\u6B49~"));
    process.exit(0);
  }
  if (mdName.length == 1) {
    createRootRouter(mdName[0]);
  } else {
    createChildren(mdName.join("/"));
  }
}
function createRootRouter(moduleName) {
  var _a, _b;
  let _data = (0, import_common.qianCliJson)();
  let templateUrl = import_path.default.join(__dirname, "../", "template", "create");
  let renderRouteUrl = import_path.default.join(process.cwd(), _data.router.routePath);
  let renderPageUrl = import_path.default.join(process.cwd(), _data.router.pagePath);
  let pageUrl = import_path.default.join(templateUrl, "page.ejs");
  let routeUrl = import_path.default.join(templateUrl, "route.ejs");
  let tsSuffix = ".ts";
  let routeName = moduleName + tsSuffix;
  let vueSuffix = ".vue";
  let vueName = moduleName + vueSuffix;
  if (import_fs.default.existsSync(import_path.default.join(renderRouteUrl, routeName))) {
    console.log((0, import_kolorist.red)(`${import_path.default.join(renderRouteUrl, routeName)} \u5B58\u5728\uFF01\uFF01\uFF01`));
    process.exit(0);
  }
  if (_data.router.isPageDir) {
    if (import_fs.default.existsSync(import_path.default.join(renderPageUrl, moduleName, vueName))) {
      console.log((0, import_kolorist.red)(`${import_path.default.join(renderPageUrl, moduleName, vueName)} \u5B58\u5728\uFF01\uFF01\uFF01`));
      process.exit(0);
    }
  } else {
    if (import_fs.default.existsSync(import_path.default.join(renderPageUrl, vueName))) {
      console.log((0, import_kolorist.red)(`${import_path.default.join(renderPageUrl, vueName)} \u5B58\u5728\uFF01\uFF01\uFF01`));
      process.exit(0);
    }
  }
  let routerMeta = `
    path: '/${moduleName}',
    name: '${moduleName}',
    component: () => import('${import_path.default.join(_data.router.alias, _data.router.pagePath.split("src")[1], _data.router.isPageDir ? moduleName : "", moduleName + ".vue").split("\\").join("/")}'),
  `;
  let sass = ((_a = (0, import_common.userPackageJson)()["devDependencies"]) == null ? void 0 : _a["sass"]) ?? ((_b = (0, import_common.userPackageJson)()["dependencies"]) == null ? void 0 : _b["sass"]) ?? false;
  let isScss = sass ? `lang="scss" ` : "";
  import_ejs.default.renderFile(pageUrl, {
    pageName: moduleName,
    isScss
  }).then((data) => {
    if (_data.router.isPageDir) {
      import_fs.default.mkdirSync(import_path.default.join(renderPageUrl, moduleName));
      import_fs.default.writeFileSync(import_path.default.join(renderPageUrl, moduleName, vueName), data);
    } else {
      import_fs.default.writeFileSync(import_path.default.join(renderPageUrl, vueName), data);
    }
  });
  import_ejs.default.renderFile(routeUrl, {
    routeName: moduleName + "Route",
    routerMeta,
    children: "[]"
  }).then((data) => {
    import_fs.default.writeFileSync(import_path.default.join(renderRouteUrl, routeName), data);
    if (import_shelljs.default.exec(`npx prettier --write  "src/router/modules/${moduleName}.ts"`).code !== 0) {
      import_shelljs.default.echo("prettier\u683C\u5F0F\u5316\u9519\u8BEF");
    }
    console.log((0, import_kolorist.green)("\u521B\u5EFA\u6210\u529F\uFF01\uFF01\uFF01"));
  });
}
function createChildren(moduleName) {
  var _a, _b;
  let _data = (0, import_common.qianCliJson)();
  let templateUrl = import_path.default.join(__dirname, "../", "template", "create");
  let fatherName = moduleName.split("/")[0];
  let sonName = moduleName.split("/")[1];
  let fatherUrl = import_path.default.join(process.cwd(), _data.router.routePath, fatherName + ".ts");
  if (!import_fs.default.existsSync(fatherUrl)) {
    console.log((0, import_kolorist.red)(`\u627E\u4E0D\u5230 ${fatherUrl}`));
    process.exit(0);
  }
  if (_data.router.isPageDir) {
    if (!import_fs.default.existsSync(import_path.default.join(import_path.default.join(process.cwd(), _data.router.pagePath), fatherName))) {
      console.log((0, import_kolorist.red)(`\u627E\u4E0D\u5230 ${import_path.default.join(import_path.default.join(process.cwd(), _data.router.pagePath), fatherName)}`));
      process.exit(0);
    }
    if (import_fs.default.existsSync(import_path.default.join(import_path.default.join(process.cwd(), _data.router.pagePath), fatherName, sonName, sonName + ".vue"))) {
      console.log((0, import_kolorist.red)(`${import_path.default.join(import_path.default.join(process.cwd(), _data.router.pagePath), fatherName, sonName, sonName + ".vue")}\u5B58\u5728\uFF01`));
      process.exit(0);
    }
  } else {
    if (import_fs.default.existsSync(import_path.default.join(import_path.default.join(process.cwd(), _data.router.pagePath, sonName + ".vue")))) {
      console.log((0, import_kolorist.red)(`${import_path.default.join(import_path.default.join(process.cwd(), _data.router.pagePath, sonName + ".vue"))}\u5B58\u5728\uFF01`));
      process.exit(0);
    }
    if (!import_fs.default.existsSync(import_path.default.join(import_path.default.join(process.cwd(), _data.router.pagePath)))) {
      console.log((0, import_kolorist.red)(`\u627E\u4E0D\u5230 ${import_path.default.join(import_path.default.join(process.cwd(), _data.router.pagePath))}`));
      process.exit(0);
    }
  }
  let route = import_fs.default.readFileSync(fatherUrl).toString();
  let children = {
    path: `${sonName}`,
    name: `${sonName}`,
    component: _data.router.isPageDir ? `() => import("@/views/${fatherName}/${sonName}/${sonName}.vue")` : `() => import("@/views/${sonName}.vue")`
  };
  let defaultName = (0, import_common.exportDefaultName)(route);
  let obj = (0, import_common.stringObjectParse)(route, defaultName);
  let chid = obj.children ?? [];
  chid.push(children);
  obj.children = chid;
  let data = (0, import_common.JSONArrModule)(chid).replace(/\\"/g, '"').replace(/"([^"]+)":/g, "$1:").replace(/"\(/g, "(").replace(/\)"/g, ")");
  let result = "";
  for (let key in obj) {
    if (key == "children") {
    } else if (obj[key] instanceof Object) {
      let s = JSON.stringify(obj[key], (key2, value) => {
        if (value instanceof Function) {
          return value.toString();
        }
        return value;
      }).replace(/\\"/g, '"').replace(/"([^"]+)":/g, "$1:").replace(/"\(/g, "(").replace(/\)"/g, ")");
      result += `${key}: ${s},`;
    } else {
      result += `${key}: "${obj[key]}",`;
    }
  }
  let renderPageUrl = import_path.default.join(process.cwd(), _data.router.pagePath);
  let sass = ((_a = (0, import_common.userPackageJson)()["devDependencies"]) == null ? void 0 : _a["sass"]) ?? ((_b = (0, import_common.userPackageJson)()["dependencies"]) == null ? void 0 : _b["sass"]) ?? false;
  let isScss = sass ? `lang="scss" ` : "";
  import_ejs.default.renderFile(import_path.default.join(templateUrl, "page.ejs"), {
    pageName: sonName,
    isScss
  }).then((data2) => {
    if (_data.router.isPageDir) {
      if (!import_fs.default.existsSync(import_path.default.join(renderPageUrl, fatherName, sonName))) {
        import_fs.default.mkdirSync(import_path.default.join(renderPageUrl, fatherName, sonName));
      }
      import_fs.default.writeFileSync(import_path.default.join(renderPageUrl, fatherName, sonName, sonName + ".vue"), data2);
    } else {
      import_fs.default.writeFileSync(import_path.default.join(renderPageUrl, sonName + ".vue"), data2);
    }
  });
  import_ejs.default.renderFile(import_path.default.join(templateUrl, "route.ejs"), {
    routeName: defaultName,
    routerMeta: result,
    children: data
  }).then((data2) => {
    import_fs.default.writeFileSync(fatherUrl, data2);
    if (import_shelljs.default.exec(`npx prettier --write  "src/router/modules/${fatherName}.ts"`).code !== 0) {
      import_shelljs.default.echo("prettier\u683C\u5F0F\u5316\u9519\u8BEF");
    }
    console.log((0, import_kolorist.green)("\u521B\u5EFA\u6210\u529F\uFF01\uFF01\uFF01"));
  });
}
function createStore(moduleName) {
  let _data = (0, import_common.qianCliJson)();
  let templateUrl = import_path.default.join(__dirname, "../", "template", "create");
  let renderStorerl = import_path.default.join(process.cwd(), _data.store.storePath);
  import_ejs.default.renderFile(import_path.default.join(templateUrl, "store.ejs"), {
    storeName: (0, import_common.firstToUpper)(moduleName),
    storeId: moduleName
  }).then((data) => {
    import_fs.default.writeFileSync(import_path.default.join(renderStorerl, moduleName + ".ts"), data);
    console.log((0, import_kolorist.green)("\u521B\u5EFA\u6210\u529F\uFF01\uFF01\uFF01"));
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkConfigJson,
  createChildren,
  createModule,
  createRootRouter,
  createRouter,
  createStore,
  selectModule
});
