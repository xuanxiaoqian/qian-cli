import fs from 'fs'

// 将json数据的属性排一下序
export default function sortDependencies(packageJson) {
  const sorted: any = {}

  const depTypes = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ]

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {}

      Object.keys(packageJson[depType])
        .sort()
        .forEach((name) => {
          sorted[depType][name] = packageJson[depType][name]
        })
    }
  }

  return {
    ...packageJson,
    ...sorted,
  }
}

// 判断是否是object
const isObject = (val) => val && typeof val === 'object'

// 数组去重
const mergeArrayWithDedupe = (a, b) => Array.from(new Set([...a, ...b]))

/**
 * Recursively merge the content of the new object to the existing one
 * @param {Object} target the existing object
 * @param {Object} obj the new object
 */
export function deepMerge(target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key]
    const newVal = obj[key]

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal)
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal)
    } else {
      target[key] = newVal
    }
  }

  return target
}

/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
export function readJsonFile<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8', flag: 'r' }))
}

/**
 *
 * @param str 将字符串首字母大写
 * @returns
 */
export function firstToUpper(str: string) {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase())
}

/**
 * 传进来字符串，返回字符串里面默认导出的名字
 * @param stringValue 要转换的字符串
 * @returns 默认导出名
 */
export function exportDefaultName(stringValue: string) {
  let matchString = stringValue.match(/export+\s+default+\s+\w+/)

  if (!matchString) return false

  let name = matchString[0].replace(/\s+/g, ' ')
  let exportDefaultName = name.split(' ')[2]
  return exportDefaultName
}

/**
 * 传进来一个字符串、一个对象名，返回一个可以调用的对象
 * @param objectString 模块
 * @param name 对象名
 * @returns 动态对象
 */
export function stringObjectParse(objectString: string, name: string) {
  // 这里是为了防止对象里面有跟name重名的字段
  let splitStringObject: any = objectString.split(name)
  splitStringObject.shift()
  splitStringObject = splitStringObject.join(name)

  let flag = 0 //记录括号是否闭合
  let latestIndex = 0
  let EndIndex = 0

  for (let i = 0; i < splitStringObject.length; i++) {
    if (splitStringObject[i] == '{') {
      if (flag == 0) {
        latestIndex = i
      }
      flag += 1
    }

    if (splitStringObject[i] == '}') {
      flag -= 1
    }

    if (flag == 0 && latestIndex !== 0) {
      EndIndex = i
      break
    }
  }

  let obj = new Function(
    'value',
    `
        return eval("(" + value + ")");
      `,
  ).call(this, splitStringObject.substring(latestIndex, EndIndex + 1))

  return obj
}

/**
 * 传进来一个js数组变量，一比一的转为字符串数组变量
 * @param arr 数组变量
 * @returns 字符串的数组格式
 */
export function JSONArrModule(arr: string) {
  let obj = JSON.stringify(arr, (key, value) => {
    if (value instanceof Function) {
      return value.toString()
    }

    return value
  })

  return obj
}
