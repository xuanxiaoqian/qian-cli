#!/usr/bin/env node

import { program } from 'commander'
import create from './core/create'
import init from './core/init'
import { currentPackageJson } from './utils/common'

import notifier from './utils/updateNotifier'
notifier.notify({ isGlobal: true })

program
  .version(`${currentPackageJson.version}`, '-v --version')
  .usage('<command> [options]')

program
  .command('init <app-name> [git...]')
  .description('创建一个新的项目 例如: qian-cli init v3-project')
  .action(async (name: string, git: string[]) => {
    await init(name, git)
  })

program
  .command('create <modules-name>')
  .description('新建一个模块 例如: qian-cli create user')
  .action(async (name: string) => {
    await create(name)
  })

program.parse(process.argv)
