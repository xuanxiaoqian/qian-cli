#!/usr/bin/env zx
import 'zx/globals'

await $`npm run build:cli`

try {
  let { version } = JSON.parse(fs.readFileSync('./package.json'))
  let _data = JSON.parse(fs.readFileSync('./package.json'))

  let v = _data.version.split('.').map(Number)

  v[v.length - 1] += 1

  _data.version = v.join('.')

  fs.writeFileSync('./package.json', JSON.stringify(_data, null, 2))

  console.log(`版本号： ${version} -> ${_data.version}`)

  await $`git add .`

  await $`git commit -m "版本号: ${_data.version}"`

  await $`git push gitee dev`

  try {
    await $`git push github dev`
  } catch (error) {}

  console.log(`版本号： ${version} -> ${_data.version}`)
} catch (err) {
  console.log('报错了,数据回滚')

  let { version } = JSON.parse(fs.readFileSync('./package.json'))
  let _data = JSON.parse(fs.readFileSync('./package.json'))

  let v = _data.version.split('.').map(Number)

  v[v.length - 1] -= 1

  _data.version = v.join('.')

  fs.writeFileSync('./package.json', JSON.stringify(_data, null, 2))

  console.log(`版本号： ${version} -> ${_data.version}`)

  precess.exits(0)
}
