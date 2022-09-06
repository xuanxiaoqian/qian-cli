#!/usr/bin/env zx
import "zx/globals";

await $`npm run build:cli`;

let { version } = JSON.parse(fs.readFileSync("./package.json"));
let _data = JSON.parse(fs.readFileSync("./package.json"));

let v = _data.version.split(".").map(Number);

v[v.length - 1] += 1;

_data.version = v.join(".");

fs.writeFileSync("./package.json", JSON.stringify(_data));

console.log(`版本号： ${version} -> ${_data.version}`);

await $`prettier --write  \"./package.json\"`;

await $`git tag -m "v${_data.version}" v${_data.version}`
await $`git push --follow-tags`


// await $`git add -A`; // 合并至commit

await $`git commit -am "版本号: ${_data.version}"`;

await $`git push`;

// await $`git push github`;    // 没开梯子容易超时，建议手动提交

console.log(`版本号： ${version} -> ${_data.version}`);