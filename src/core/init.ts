import { qianCliJson } from '../utils/common'
import {
  checkName,
  checkTemplate,
  render,
  selectFeature,
  Tips,
} from '../utils/init'

export default async function init(name: string): Promise<void> {
  let { projectPath, isCwd } = checkName(name)

  let qianJson = qianCliJson()?.template ?? false

  // 如果用户没有配置远程模板
  if (!qianJson) {
    const feature = await selectFeature()

    await render(projectPath, feature)

    Tips(name, isCwd)
  } else {
    checkTemplate(projectPath, isCwd)
  }
}
