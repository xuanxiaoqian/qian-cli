#!/usr/bin/env zx
import "zx/globals";

await $`npm run build:cli`;

let { version } = JSON.parse(await fs.readFile("./package.json"));
let _data = JSON.parse(fs.readFileSync("./package.json"));

let v = _data.version.split(".").map(Number);

v[v.length - 1] += 1;

_data.version = v.join(".");

fs.writeFileSync("./package.json", JSON.stringify(_data));

console.log(`版本号： ${version} -> ${_data.version}`);

await $`git add .`;

await $`git commit -m "版本号: ${version}"`;

await $`git push`;
