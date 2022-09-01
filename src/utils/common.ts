import fs from "fs";

// 将json数据的属性排一下序
export default function sortDependencies(packageJson) {
  const sorted: any = {};

  const depTypes = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ];

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {};

      Object.keys(packageJson[depType])
        .sort()
        .forEach((name) => {
          sorted[depType][name] = packageJson[depType][name];
        });
    }
  }

  return {
    ...packageJson,
    ...sorted,
  };
}

// 判断是否是object
const isObject = (val) => val && typeof val === "object";

// 数组去重
const mergeArrayWithDedupe = (a, b) =>
  Array.from(new Set([...a, ...b]));

/**
 * Recursively merge the content of the new object to the existing one
 * @param {Object} target the existing object
 * @param {Object} obj the new object
 */
export function deepMerge(target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }

  return target;
}



/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
 export function readJsonFile<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8", flag: "r" }));
}



/**
 * 
 * @param str 将字符串首字母大写
 * @returns 
 */
 export function firstToUpper(str:string) {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}