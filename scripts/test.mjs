#!/usr/bin/env zx
import 'zx/globals'
import chalk from 'chalk'

let { stdout } = await $`npm view qian-cli version`

let { version } = JSON.parse(await fs.readFile(`${path.join(__dirname,'../package.json')}`))

if (String(stdout) != String(version + '\n')) {
  console.log(`
    ╭──────────────────────────────────────────────╮
    │                                              │
    │      Update available ${version} → ${chalk.green(stdout)}    
    │   Run ${chalk.blueBright('npm i -g npm-check-updates')} to update   │
    │                                              │
    ╰──────────────────────────────────────────────╯
    `)
}
