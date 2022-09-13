<<<<<<< HEAD
import updateNotifier from 'update-notifier'
import { readJsonFile } from './common'
import path from 'path'

let _data: any = readJsonFile(path.join(__dirname, '../../package.json'))
const notifier = updateNotifier({ pkg: _data, updateCheckInterval: 0 })

export default notifier
=======
import updateNotifier from 'update-notifier'
import { readJsonFile } from './common'
import path from 'path'

let _data: any = readJsonFile(path.join(__dirname, '../../package.json'))
const notifier = updateNotifier({ pkg: _data, updateCheckInterval: 0 })

export default notifier
>>>>>>> 6a5421b6d689a18028cb9109d022695442b043c2
