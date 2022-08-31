#!/usr/bin/env zx
import "zx/globals";

await $`npm run build:cli`;

let { version } = JSON.parse(await fs.readFile("./package.json"));

await $`git add .`;

await $`git commit -m "版本号: ${version}"`;

await $`git push`;
