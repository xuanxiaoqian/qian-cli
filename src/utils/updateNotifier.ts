import updateNotifier from 'update-notifier'

import { currentPackageJson } from "./common";

const notifier = updateNotifier({ pkg: currentPackageJson, updateCheckInterval: 0 })

export default notifier
