#!/usr/bin/env node
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
var import_commander = require("commander");
var import_create = __toESM(require("./core/create"));
var import_init = __toESM(require("./core/init"));
var import_updateNotifier = __toESM(require("./utils/updateNotifier"));
import_updateNotifier.default.notify({ isGlobal: true });
import_commander.program.version(`${require("../package.json").version}`, "-v --version").usage("<command> [options]");
import_commander.program.command("init <app-name>").description("\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u9879\u76EE \u4F8B\u5982: qian-cli init v3-project").action((name) => __async(exports, null, function* () {
  yield (0, import_init.default)(name);
}));
import_commander.program.command("create <modules-name>").description("\u65B0\u5EFA\u4E00\u4E2A\u6A21\u5757 \u4F8B\u5982: qian-cli create user").action((name) => __async(exports, null, function* () {
  yield (0, import_create.default)(name);
}));
import_commander.program.parse(process.argv);
