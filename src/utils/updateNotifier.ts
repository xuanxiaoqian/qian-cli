import updateNotifier from 'update-notifier'
import { readJsonFile } from './common'
import path from 'path'

let _data: any = readJsonFile(path.join(__dirname, '../../package.json'))
const notifier = updateNotifier({ pkg: _data, updateCheckInterval: 0 })

export default notifier