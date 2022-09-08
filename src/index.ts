#!/usr/bin/env node

import { program } from 'commander'
import create from './core/create'
import init from './core/init'

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
