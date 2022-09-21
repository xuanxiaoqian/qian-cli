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
var init_exports = {};
__export(init_exports, {
  default: () => init
});
module.exports = __toCommonJS(init_exports);
var import_kolorist = require("kolorist");
var import_init = require("../utils/init");
async function init(name, git) {
  let { projectPath, isCwd } = (0, import_init.checkName)(name);
  if (git.length > 0) {
    var regex = new RegExp(/^http(s)?:\/\/.*\.git$/);
    if (!regex.test(git[0])) {
      console.log((0, import_kolorist.red)(`\u65E0\u6548git\u5730\u5740${git[0]},\u5FC5\u987B\u4EE5.git\u7ED3\u5C3E`));
      process.exit(1);
    } else {
      (0, import_init.checkTemplate)(projectPath, isCwd, git);
    }
  } else {
    const feature = await (0, import_init.selectFeature)();
    await (0, import_init.render)(projectPath, feature);
    (0, import_init.Tips)(name, isCwd);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
