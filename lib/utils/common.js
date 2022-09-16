var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {})
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var common_exports = {};
__export(common_exports, {
  JSONArrModule: () => JSONArrModule,
  currentPackageJson: () => currentPackageJson,
  deepMerge: () => deepMerge,
  default: () => sortDependencies,
  exportDefaultName: () => exportDefaultName,
  firstToUpper: () => firstToUpper,
  qianCliJson: () => qianCliJson,
  readJsonFile: () => readJsonFile,
  removeDir: () => removeDir,
  stringObjectParse: () => stringObjectParse
});
module.exports = __toCommonJS(common_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
function sortDependencies(packageJson) {
  const sorted = {};
  const depTypes = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies"
  ];
  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {};
      Object.keys(packageJson[depType]).sort().forEach((name) => {
        sorted[depType][name] = packageJson[depType][name];
      });
    }
  }
  return __spreadValues(__spreadValues({}, packageJson), sorted);
}
const isObject = (val) => val && typeof val === "object";
const mergeArrayWithDedupe = (a, b) => Array.from(/* @__PURE__ */ new Set([...a, ...b]));
function deepMerge(target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }
  return target;
}
function readJsonFile(filename) {
  return JSON.parse(import_fs.default.readFileSync(filename, { encoding: "utf-8", flag: "r" }));
}
function firstToUpper(str) {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}
function exportDefaultName(stringValue) {
  let matchString = stringValue.match(/export+\s+default+\s+\w+/);
  if (!matchString)
    return false;
  let name = matchString[0].replace(/\s+/g, " ");
  let exportDefaultName2 = name.split(" ")[2];
  return exportDefaultName2;
}
function stringObjectParse(objectString, name) {
  let splitStringObject = objectString.split(name);
  splitStringObject.shift();
  splitStringObject = splitStringObject.join(name);
  let flag = 0;
  let latestIndex = 0;
  let EndIndex = 0;
  for (let i = 0; i < splitStringObject.length; i++) {
    if (splitStringObject[i] == "{") {
      if (flag == 0) {
        latestIndex = i;
      }
      flag += 1;
    }
    if (splitStringObject[i] == "}") {
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
  ).call(this, splitStringObject.substring(latestIndex, EndIndex + 1));
  return obj;
}
function JSONArrModule(arr) {
  let obj = JSON.stringify(arr, (key, value) => {
    if (value instanceof Function) {
      return value.toString();
    }
    return value;
  });
  return obj;
}
const currentPackageJson = require(import_path.default.join(
  __dirname,
  "../../package.json"
));
const qianCliJson = () => {
  if (import_fs.default.existsSync(import_path.default.join(process.cwd(), "qian-cli.json"))) {
    return require(import_path.default.join(process.cwd(), "qian-cli.json"));
  } else {
    return false;
  }
};
function removeDir(filePath) {
  let statObj = import_fs.default.statSync(filePath);
  if (statObj.isDirectory()) {
    let dirs = import_fs.default.readdirSync(filePath);
    dirs = dirs.map((dir) => import_path.default.join(filePath, dir));
    for (let i = 0; i < dirs.length; i++) {
      removeDir(dirs[i]);
    }
    import_fs.default.rmdirSync(filePath);
  } else {
    import_fs.default.unlinkSync(filePath);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JSONArrModule,
  currentPackageJson,
  deepMerge,
  exportDefaultName,
  firstToUpper,
  qianCliJson,
  readJsonFile,
  removeDir,
  stringObjectParse
});
