import { red } from 'kolorist'

import {
  checkName,
  checkTemplate,
  render,
  selectFeature,
  Tips,
} from '../utils/init'

export default async function init(name: string, git: string[]): Promise<void> {
  let { projectPath, isCwd } = checkName(name)

  // 用户使用远程git仓库
  if (git.length > 0) {
    var regex = new RegExp(/^http(s)?:\/\/.*\.git$/)

    // 如果不是 http/https开头和.git结尾
    if (!regex.test(git[0])) {
      console.log(red(`无效git地址${git[0]},必须以.git结尾`))
      process.exit(1)
    } else {
      checkTemplate(projectPath, isCwd, git)
    }
  } else {
    // 用户使用本地qian-cli模板
    const feature = await selectFeature()

    await render(projectPath, feature)

    Tips(name, isCwd)
  }
}
