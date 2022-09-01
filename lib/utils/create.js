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
var create_exports = {};
__export(create_exports, {
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
function selectModule() {
  return __async(this, null, function* () {
    const question = [
      {
        type: "list",
        message: "\u8BF7\u9009\u62E9\u8981\u521B\u5EFA\u4EC0\u4E48\u6A21\u5757",
        name: "module",
        choices: ["router", "store"]
      }
    ];
    let answer = yield import_inquirer.default.prompt(question);
    return answer.module;
  });
}
function createModule(moduleStr, moduleName) {
  if (moduleStr == "router") {
    createRouter(moduleName);
  } else if (moduleStr == "store") {
    createStore(moduleName);
  }
}
function createRouter(moduleName) {
  if (moduleName.split("/").length == 1) {
    createRootRouter(moduleName);
  } else if (moduleName.split("/").length == 2) {
    createChildren(moduleName);
  }
}
function createRootRouter(moduleName) {
  let _data = (0, import_common.readJsonFile)(import_path.default.join(process.cwd(), "qian-cli.json"));
  let templateUrl = import_path.default.join(__dirname, "../", "template", "create");
  let renderRouteUrl = import_path.default.join(process.cwd(), _data.router.routePath);
  let renderPageUrl = import_path.default.join(process.cwd(), _data.router.pagePath);
  let pageUrl = import_path.default.join(templateUrl, "page.ejs");
  let routeUrl = import_path.default.join(templateUrl, "route.ejs");
  let tsSuffix = ".ts";
  let routeName = moduleName + tsSuffix;
  let vueSuffix = ".vue";
  let vueName = moduleName + vueSuffix;
  let routerMeta = `
    path: '/${moduleName}',
    name: '${moduleName}',
    component: () => import('${import_path.default.join(
    _data.router.alias,
    _data.router.pagePath.split("src")[1],
    _data.router.isPageDir ? moduleName : "",
    moduleName + ".vue"
  ).split("\\").join("/")}'),
  `;
  import_ejs.default.renderFile(routeUrl, {
    routeName: moduleName,
    routerMeta,
    children: "[]"
  }).then((data) => {
    import_fs.default.writeFileSync(import_path.default.join(renderRouteUrl, routeName), data);
  });
  import_ejs.default.renderFile(pageUrl, {
    pageName: moduleName
  }).then((data) => {
    if (_data.router.isPageDir) {
      import_fs.default.mkdirSync(import_path.default.join(renderPageUrl, moduleName));
      import_fs.default.writeFileSync(import_path.default.join(renderPageUrl, moduleName, vueName), data);
    } else {
      import_fs.default.writeFileSync(import_path.default.join(renderPageUrl, vueName), data);
    }
    if (import_shelljs.default.exec(
      `npx prettier --write  "src/router/modules/${moduleName}.ts"`
    ).code !== 0) {
      import_shelljs.default.echo("prettier\u683C\u5F0F\u5316\u9519\u8BEF");
      import_shelljs.default.exit(1);
    }
  });
}
function createChildren(moduleName) {
  var _a;
  let _data = (0, import_common.readJsonFile)(import_path.default.join(process.cwd(), "qian-cli.json"));
  let templateUrl = import_path.default.join(__dirname, "../", "template", "create");
  let fatherName = moduleName.split("/")[0];
  let sonName = moduleName.split("/")[1];
  let fatherUrl = import_path.default.join(
    process.cwd(),
    _data.router.routePath,
    fatherName + ".ts"
  );
  let route = import_fs.default.readFileSync(fatherUrl).toString();
  let chidren = {
    path: `${sonName}`,
    name: `${sonName}`,
    component: _data.router.isPageDir ? `() => import("@/views/${fatherName}/${sonName}.vue")` : `() => import("@/views/${sonName}.vue")`
  };
  let splitRouteObject = route.split(`${fatherName}Route:`)[1];
  let flag = 0;
  let latestIndex = 0;
  let EndIndex = 0;
  for (let i = 0; i < splitRouteObject.length; i++) {
    if (splitRouteObject[i] == "{") {
      if (flag == 0) {
        latestIndex = i;
      }
      flag += 1;
    }
    if (splitRouteObject[i] == "}") {
      flag -= 1;
    }
    if (flag == 0 && latestIndex !== 0) {
      EndIndex = i;
      break;
    }
  }
  let obj = new Function(
    "value",
    `
    return eval("(" + value + ")");
  `
  ).call(this, splitRouteObject.substring(latestIndex, EndIndex + 1));
  let chid = (_a = obj.children) != null ? _a : [];
  chid.push(chidren);
  obj.children = chid;
  let arr = obj.children;
  let data = JSON.stringify(arr, (key, value) => {
    if (value instanceof Function) {
      return value.toString();
    }
    return value;
  }).replace(/\\"/g, '"').replace(/"([^"]+)":/g, "$1:").replace(/"\(/g, "(").replace(/\)"/g, ")");
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
  import_ejs.default.renderFile(import_path.default.join(templateUrl, "page.ejs"), {
    pageName: sonName
  }).then((data2) => {
    import_fs.default.writeFileSync(
      import_path.default.join(
        renderPageUrl,
        _data.router.isPageDir ? fatherName : "",
        sonName + ".vue"
      ),
      data2
    );
  });
  import_ejs.default.renderFile(import_path.default.join(templateUrl, "route.ejs"), {
    routeName: fatherName,
    routerMeta: result,
    children: data
  }).then((data2) => {
    import_fs.default.writeFileSync(fatherUrl, data2);
    if (import_shelljs.default.exec(
      `npx prettier --write  "src/router/modules/${fatherName}.ts"`
    ).code !== 0) {
      import_shelljs.default.echo("prettier\u683C\u5F0F\u5316\u9519\u8BEF");
      import_shelljs.default.exit(1);
    }
  });
}
function createStore(moduleName) {
  let _data = (0, import_common.readJsonFile)(import_path.default.join(process.cwd(), "qian-cli.json"));
  let templateUrl = import_path.default.join(__dirname, "../", "template", "create");
  let renderStorerl = import_path.default.join(process.cwd(), _data.store.storePath);
  import_ejs.default.renderFile(import_path.default.join(templateUrl, "store.ejs"), {
    storeName: (0, import_common.firstToUpper)(moduleName),
    storeId: moduleName
  }).then((data) => {
    import_fs.default.writeFileSync(import_path.default.join(renderStorerl, moduleName + ".ts"), data);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createChildren,
  createModule,
  createRootRouter,
  createRouter,
  createStore,
  selectModule
});
