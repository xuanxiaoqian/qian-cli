import path from 'path'
import ejs from 'ejs'
import fs from 'fs'
import inquirer from 'inquirer'
import shell from 'shelljs'
import { exportDefaultName, firstToUpper, JSONArrModule, stringObjectParse, qianCliJson, userPackageJson } from './common'
import { red, green } from 'kolorist'

export const checkConfigJson = () => {
  if (!(qianCliJson() ?? false)) {
    console.log(red(`未找到 ${path.join(process.cwd(), 'qian-cli.json')}`))

    process.exit(1)
  }
}

export async function selectModule(): Promise<string> {
  const question = [
    {
      type: 'list',
      message: '请选择要创建什么模块',
      name: 'module',
      choices: ['router', 'store'],
    },
  ]
  let answer = await inquirer.prompt(question)

  return answer.module as string
}

export function createModule(moduleStr: string, moduleName: string) {
  if (moduleName.split('/').length > 1) {
    createRouter(moduleName)
    return
  }

  if (moduleStr == 'router') {
    createRouter(moduleName)
  } else if (moduleStr == 'store') {
    createStore(moduleName)
  }
}

export function createRouter(moduleName: string) {
  let mdName = moduleName.split('/').filter((str) => !!str)

  if (mdName.length > 2) {
    console.log(red('当前最多只能支持二级路由,抱歉~'))
    process.exit(0)
  }

  if (mdName.length == 1) {
    createRootRouter(mdName[0])
  } else {
    createChildren(mdName.join('/'))
  }
}

export function createRootRouter(moduleName: string) {
  let _data: any = qianCliJson()

  // 模版文件目录
  let templateUrl = path.join(__dirname, '../', 'template', 'create')

  let renderRouteUrl = path.join(process.cwd(), _data.router.routePath)
  let renderPageUrl = path.join(process.cwd(), _data.router.pagePath)

  let pageUrl = path.join(templateUrl, 'page.ejs')
  let routeUrl = path.join(templateUrl, 'route.ejs')

  let tsSuffix = '.ts'
  let routeName = moduleName + tsSuffix

  let vueSuffix = '.vue'
  let vueName = moduleName + vueSuffix

  if (fs.existsSync(path.join(renderRouteUrl, routeName))) {
    console.log(red(`${path.join(renderRouteUrl, routeName)} 存在！！！`))
    process.exit(0)
  }

  if (_data.router.isPageDir) {
    if (fs.existsSync(path.join(renderPageUrl, moduleName, vueName))) {
      console.log(red(`${path.join(renderPageUrl, moduleName, vueName)} 存在！！！`))
      process.exit(0)
    }
  } else {
    if (fs.existsSync(path.join(renderPageUrl, vueName))) {
      console.log(red(`${path.join(renderPageUrl, vueName)} 存在！！！`))
      process.exit(0)
    }
  }

  let routerMeta = `
    path: '/${moduleName}',
    name: '${moduleName}',
    component: () => import('${path
      .join(_data.router.alias, _data.router.pagePath.split('src')[1], _data.router.isPageDir ? moduleName : '', moduleName + '.vue')
      .split('\\')
      .join('/')}'),
  `

  let sass = userPackageJson()['devDependencies']?.['sass'] ?? userPackageJson()['dependencies']?.['sass'] ?? false

  let isScss = sass ? `lang="scss" ` : ''

  ejs
    .renderFile(pageUrl, {
      pageName: moduleName,
      isScss,
    })
    .then((data) => {
      if (_data.router.isPageDir) {
        fs.mkdirSync(path.join(renderPageUrl, moduleName))
        fs.writeFileSync(path.join(renderPageUrl, moduleName, vueName), data)
      } else {
        fs.writeFileSync(path.join(renderPageUrl, vueName), data)
      }
    })

  ejs
    .renderFile(routeUrl, {
      routeName: moduleName + 'Route',
      routerMeta: routerMeta,
      children: '[]',
    })
    .then((data) => {
      // 生成 ejs 处理后的模版文件
      fs.writeFileSync(path.join(renderRouteUrl, routeName), data)

      if (shell.exec(`npx prettier --write  \"src/router/modules/${moduleName}.ts\"`).code !== 0) {
        shell.echo('prettier格式化错误')
      }

      console.log(green('创建成功！！！'))
    })
}

export function createChildren(moduleName: string) {
  let _data: any = qianCliJson()
  let templateUrl = path.join(__dirname, '../', 'template', 'create')

  let fatherName = moduleName.split('/')[0]
  let sonName = moduleName.split('/')[1]

  let fatherUrl = path.join(process.cwd(), _data.router.routePath, fatherName + '.ts')

  if (!fs.existsSync(fatherUrl)) {
    console.log(red(`找不到 ${fatherUrl}`))
    process.exit(0)
  }

  if (_data.router.isPageDir) {
    if (!fs.existsSync(path.join(path.join(process.cwd(), _data.router.pagePath), fatherName))) {
      console.log(red(`找不到 ${path.join(path.join(process.cwd(), _data.router.pagePath), fatherName)}`))
      process.exit(0)
    }

    if (fs.existsSync(path.join(path.join(process.cwd(), _data.router.pagePath), fatherName, sonName, sonName + '.vue'))) {
      console.log(red(`${path.join(path.join(process.cwd(), _data.router.pagePath), fatherName, sonName, sonName + '.vue')}存在！`))
      process.exit(0)
    }
  } else {
    if (fs.existsSync(path.join(path.join(process.cwd(), _data.router.pagePath, sonName + '.vue')))) {
      console.log(red(`${path.join(path.join(process.cwd(), _data.router.pagePath, sonName + '.vue'))}存在！`))
      process.exit(0)
    }
    if (!fs.existsSync(path.join(path.join(process.cwd(), _data.router.pagePath)))) {
      console.log(red(`找不到 ${path.join(path.join(process.cwd(), _data.router.pagePath))}`))
      process.exit(0)
    }
  }

  let route = fs.readFileSync(fatherUrl).toString()
  let children = {
    path: `${sonName}`,
    name: `${sonName}`,
    component: _data.router.isPageDir ? `() => import("@/views/${fatherName}/${sonName}/${sonName}.vue")` : `() => import("@/views/${sonName}.vue")`,
  }

  let defaultName = exportDefaultName(route) as string
  let obj = stringObjectParse(route, defaultName)

  let chid = obj.children ?? []
  chid.push(children)
  obj.children = chid

  let data = JSONArrModule(chid)
    .replace(/\\"/g, '"')
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"\(/g, '(')
    .replace(/\)"/g, ')')

  let result = ''
  for (let key in obj) {
    if (key == 'children') {
    } else if (obj[key] instanceof Object) {
      let s = JSON.stringify(obj[key], (key, value) => {
        if (value instanceof Function) {
          return value.toString()
        }

        return value
      })
        .replace(/\\"/g, '"')
        .replace(/"([^"]+)":/g, '$1:')
        .replace(/"\(/g, '(')
        .replace(/\)"/g, ')')

      result += `${key}: ${s},`
    } else {
      result += `${key}: "${obj[key]}",`
    }
  }

  // 一定要渲染page再渲染路由，这个bug让我去看了几天vite源码企图修改源码来解决
  // 如果渲染route再渲染page会报vite的[plugin:vite:import-analysis] Cannot read properties of undefined (reading 'url')错
  let renderPageUrl = path.join(process.cwd(), _data.router.pagePath)

  let sass = userPackageJson()['devDependencies']?.['sass'] ?? userPackageJson()['dependencies']?.['sass'] ?? false

  let isScss = sass ? `lang="scss" ` : ''
  ejs
    .renderFile(path.join(templateUrl, 'page.ejs'), {
      pageName: sonName,
      isScss,
    })
    .then((data) => {
      if (_data.router.isPageDir) {
        if (!fs.existsSync(path.join(renderPageUrl, fatherName, sonName))) {
          fs.mkdirSync(path.join(renderPageUrl, fatherName, sonName))
        }

        fs.writeFileSync(path.join(renderPageUrl, fatherName, sonName, sonName + '.vue'), data)
      } else {
        fs.writeFileSync(path.join(renderPageUrl, sonName + '.vue'), data)
      }
    })

  ejs
    .renderFile(path.join(templateUrl, 'route.ejs'), {
      routeName: defaultName,
      routerMeta: result,
      children: data,
    })
    .then((data) => {
      fs.writeFileSync(fatherUrl, data)

      if (shell.exec(`npx prettier --write  \"src/router/modules/${fatherName}.ts\"`).code !== 0) {
        shell.echo('prettier格式化错误')
      }

      console.log(green('创建成功！！！'))
    })
}

export function createStore(moduleName: string) {
  let _data: any = qianCliJson()

  // 模版文件目录
  let templateUrl = path.join(__dirname, '../', 'template', 'create')

  let renderStorerl = path.join(process.cwd(), _data.store.storePath)

  ejs
    .renderFile(path.join(templateUrl, 'store.ejs'), {
      storeName: firstToUpper(moduleName),
      storeId: moduleName,
    })
    .then((data) => {
      // 生成 ejs 处理后的模版文件
      fs.writeFileSync(path.join(renderStorerl, moduleName + '.ts'), data)

      console.log(green('创建成功！！！'))
    })
}
