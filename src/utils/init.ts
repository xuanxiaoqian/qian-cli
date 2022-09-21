import path from 'path'
import fs from 'fs'
import clear from 'clear-console'
import { exec } from 'child_process'

import { blue, red, green, lightRed } from 'kolorist'
import inquirer from 'inquirer'
import ora from 'ora'
import sortDependencies, {
  currentPackageJson,
  deepMerge,
  qianCliJson,
  readJsonFile,
  removeDir,
} from './common'

export function checkName(name: string) {
  const inCurrent = name === '.'
  const projectName = inCurrent ? path.relative('../', process.cwd()) : name
  const projectPath = inCurrent
    ? path.join(process.cwd(), name)
    : path.join(process.cwd(), projectName)

  if (fs.existsSync(projectPath) && !inCurrent) {
    console.log(red(`${projectPath} 存在`))

    process.exit(1)
  }

  return { projectPath, isCwd: inCurrent ? true : false }
}

/**
  用于下载用户自定义的模板
 */
export function checkTemplate(
  projectPath: string,
  isCwd: boolean,
  git: string[],
) {
  if (isCwd) {
    console.log(red('下载远程模板 不支持操作符 . '))
    process.exit(1)
  }

  console.log(green(`将使用远程模板下载 ${git[0]}`))
  const spinner = ora('正在初始化项目...').start() //开启进度条

  exec(
    `git clone -b ${git[1] ?? 'master'} ${git[0]} ${path.basename(
      projectPath,
    )}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(
          red(`报错原因：${err}`),
        )

        process.exit(1)
      }

      removeDir(path.join(projectPath, '.git'))
      let _data: any = readJsonFile(path.join(projectPath, 'package.json'))
      _data.name = path.basename(projectPath)
      _data.version = '0.0.0'

      let str = JSON.stringify(_data, null, 4)
      fs.writeFileSync(`${path.join(projectPath, 'package.json')}`, str)

      spinner.succeed(green('初始化完成'))

      process.exit(1)
    },
  )
}

export async function selectFeature(): Promise<Array<string>> {
  // 清空控制台
  clear()

  console.log(blue(`当前脚手架版本 v${currentPackageJson.version}`))

  console.log('开始初始化项目:')
  console.log('')

  const question = [
    {
      type: 'checkbox',
      message: '选择你需要的工具,空格选择,回车完成',
      name: 'feature',
      choices: [
        {
          value: 'axios',
          name: 'axios',
          checked: true,
        },
        {
          value: 'pinia',
          name: 'pinia',
          checked: true,
        },
        {
          value: 'scss',
          name: 'scss',
          checked: true,
        },
        {
          value: 'prettier',
          name: 'prettier',
          checked: true,
        },
        {
          value: 'TSX',
          name: 'TSX',
          checked: false,
        },
      ],
    },
  ]
  let answer = await inquirer.prompt(question)

  return answer.feature as Array<string>
}

export async function render(projectPath: string, feature: string[]) {
  const spinner = ora('正在初始化Vue3项目...').start() //开启进度条

  let templatePath: any = path.join(__dirname, '../', 'template')

  renderTemplate(path.join(templatePath, 'base'), projectPath)

  feature.map((item) => {
    renderTemplate(path.join(templatePath, 'code', item), projectPath)
  })

  let _data: any = readJsonFile(path.join(projectPath, 'package.json'))
  _data.name = path.basename(projectPath)
  _data.version = '1.0.0'

  let str = JSON.stringify(_data, null, 4)
  fs.writeFileSync(path.join(projectPath, 'package.json'), str)

  let succendMsg =
    green('初始化完成') +
    '  如需使用create命令请务必查看官方文档  ' +
    lightRed(
      'https://qian-cli.xuanxiaoqian.com/configDoc/createConfig/guide.html',
    )
  spinner.succeed(succendMsg)
}

function renderTemplate(src: string, dest: string) {
  const stats = fs.statSync(src)

  if (stats.isDirectory()) {
    if (path.basename(src) === 'node_modules') {
      return
    }

    if (path.basename(src) === 'root') {
      return
    }

    // if it's a directory, render its subdirectories and files recursively
    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file))
    }
    return
  }

  const filename = path.basename(src)

  if (filename === 'package.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'))
    const newPackage = JSON.parse(fs.readFileSync(src, 'utf8'))
    const pkg = sortDependencies(deepMerge(existing, newPackage))
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n')
    return
  }

  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
  }

  fs.copyFileSync(src, dest)
}

export function Tips(projectName: string, isCwd: boolean) {
  console.log()
  console.log(green('现在运行:'))
  console.log()
  if (!isCwd) console.log(green('  cd ' + projectName))

  console.log(green('  npm install'))
  console.log(green('  npm run dev'))
}
