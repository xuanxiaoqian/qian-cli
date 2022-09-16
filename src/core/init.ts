import {
  checkName,
  checkTemplate,
  render,
  selectFeature,
  Tips,
} from '../utils/init'

export default async function init(name: string): Promise<void> {
  let { projectPath, isCwd } = checkName(name)

  let isCustom = checkTemplate(projectPath, isCwd) ?? false

  // 如果用户没有配置远程模板
  if (isCustom ?? !isCustom) {
    const feature = await selectFeature()

    await render(projectPath, feature)

    Tips(name, isCwd)
  }
}
