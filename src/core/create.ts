import { checkConfigJson, createModule, selectModule } from '../utils/create'

export default async function create(moduleName: string): Promise<void> {
  checkConfigJson()

  let moduleStr

  // 当初不是始化子路由的时候
  if (moduleName.split('/').length == 1) {
    moduleStr = await selectModule()
  }

  createModule(moduleStr, moduleName)
}
