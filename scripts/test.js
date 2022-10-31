#!/usr/bin/env zx
import 'zx/globals'

await $`npm run build:cli`

let { version } = JSON.parse(fs.readFileSync('./package.json'))
let _data = JSON.parse(fs.readFileSync('./package.json'))

let v = _data.version.split('.').map(Number)

v[v.length - 1] += 1

_data.version = v.join('.')

fs.writeFileSync('./package.json', JSON.stringify(_data, null, 2))

console.log(`版本号： ${version} -> ${_data.version}`)

await $`prettier --write  \"./package.json\"`

// await $`git add -A`;

// await $`git tag -m "v${_data.version}" v${_data.version}`
// await $`git push --follow-tags`

await $`git commit -am "版本号: ${_data.version}"`

await $`git push gitee dev`

// await $`git push github`;

console.log(`版本号： ${version} -> ${_data.version}`)
