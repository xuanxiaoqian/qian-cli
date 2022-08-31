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
var chalk_exports = {};
__export(chalk_exports, {
  default: () => Chalk
});
module.exports = __toCommonJS(chalk_exports);
var import_chalk = __toESM(require("chalk"));
class Chalk {
  static default(str) {
    console.log(import_chalk.default.blue(str));
  }
  static red(str) {
    console.log(import_chalk.default.red(str));
  }
  static blue(str) {
    console.log(import_chalk.default.blue(str));
  }
  static green(str) {
    console.log(import_chalk.default.green(str));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
