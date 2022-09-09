#!/usr/bin/env node

import { program } from 'commander'
import create from './core/create'
import init from './core/init'
import updateNotifier from 'update-notifier'
import { readJsonFile } from './utils/common'
import path from 'path'

let _data: any = readJsonFile(path.join(__dirname, '../package.json'))
const notifier = updateNotifier({ pkg: _data, updateCheckInterval: 0 })
notifier.notify({ isGlobal: true })

program
  .version(`${require('../package.json').version}`, '-v --version')
  .usage('<command> [options]')

program
  .command('init <app-name>')
  .description('创建一个新的项目 例如: qian-cli init v3-project')
  .action(async (name: string) => {
    await init(name)
  })

program
  .command('create <modules-name>')
  .description('新建一个模块 例如: qian-cli create user')
  .action(async (name: string) => {
    await create(name)
  })

program.parse(process.argv)
