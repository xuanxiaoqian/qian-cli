const esbuild = require("esbuild");
const path = require("path");
const glob = require("glob");
const fs = require("fs-extra");
const libPath = path.join(process.cwd(), "lib");
const srcPath = path.join(process.cwd(), "src");

if (fs.existsSync(libPath)) {
  fs.emptyDirSync(libPath);
}

/** 匹配src文件夹下所有ts文件 */
const matchFiles = async () => {
  return await new Promise((resolve) => {
    glob(
      "src/**/*.ts",
      { root: process.cwd(), ignore: ["src/template/**/*"] },
      function (err, files) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        resolve(files);
      }
    );
  });
};

const build = async function () {
  await esbuild.build({
    entryPoints: await matchFiles(),
    bundle: false,
    splitting: false,
    outdir: path.join(process.cwd(), "lib"),
    format: "cjs",
    platform: "node",
    target: 'node14',
  });

  // 因为忽略了template,所以需要复制一份
  fs.copySync(path.join(srcPath, "template"), path.join(libPath, "template"));
  console.log("打包成功!");
};

build();
