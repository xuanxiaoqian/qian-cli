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
var updateNotifier_exports = {};
__export(updateNotifier_exports, {
  default: () => updateNotifier_default
});
module.exports = __toCommonJS(updateNotifier_exports);
var import_update_notifier = __toESM(require("update-notifier"));
var import_common = require("./common");
var import_path = __toESM(require("path"));
let _data = (0, import_common.readJsonFile)(import_path.default.join(__dirname, "../../package.json"));
const notifier = (0, import_update_notifier.default)({ pkg: _data, updateCheckInterval: 0 });
var updateNotifier_default = notifier;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});