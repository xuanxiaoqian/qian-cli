import { exec } from 'child_process'
import clear from 'clear-console'
import fs from 'fs'
import path from 'path'

import inquirer from 'inquirer'
import { blue, green, lightRed, red } from 'kolorist'
import ora from 'ora'
import sortDependencies, {
  currentPackageJson,
  deepMerge,
  readJsonFile,
  removeDir
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
        console.log(red(`报错原因：${err}`))

        process.exit(1)
      }

      removeDir(path.join(projectPath, '.git'))

      if (fs.existsSync(path.join(projectPath, 'package.json'))) {
        let _data: any = readJsonFile(path.join(projectPath, 'package.json'))
        _data.name = path.basename(projectPath)
        _data.version = '0.0.0'

        let str = JSON.stringify(_data, null, 4)
        fs.writeFileSync(`${path.join(projectPath, 'package.json')}`, str)
      }

      spinner.succeed(green('初始化完成'))

      console.log()
      console.log(green('现在运行:'))
      console.log()
      console.log(green('  cd ' + path.basename(projectPath)))

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
          name: 'Axios',
          checked: true,
        },
        {
          value: 'pinia',
          name: 'Pinia',
          checked: true,
        },
        {
          value: 'scss',
          name: 'Scss',
          checked: true,
        },
        {
          value: 'prettier',
          name: 'Prettier',
          checked: true,
        },
        {
          value: 'tailwind',
          name: 'Tailwind',
          checked: false,
        },
        {
          value: 'TSX',
          name: 'TSX',
          checked: false,
        },
        {
          value: 'vueUse',
          name: 'VueUse',
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
    '  该脚手架由于当初设计的缺陷导致后续新增功能困难,后期考虑基于该仓库重新开发  ' +
    lightRed(
      'https://gitee.com/xuanxiaoqian/create-quick',
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
