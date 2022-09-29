import { checkConfigJson, createModule, selectModule } from '../utils/create'

export default async function create(moduleName: string): Promise<void> {
  /**
   * 此功能原则：绝不修改用户原本数据，不能覆盖用户原有数据！！！
   * 用户的数据放在第一位，后续需要加入异常数据回滚事件
   */
  checkConfigJson()

  let moduleStr

  // 当用户初始化子路由的时候不需要用户选择创建什么模块
  if (moduleName.split('/').length == 1) {
    moduleStr = await selectModule()
  }

  createModule(moduleStr, moduleName)
}
