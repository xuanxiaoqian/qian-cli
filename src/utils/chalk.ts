/**
 * 用于向用户输出日志
 */

import chalk from "chalk";

export default class Chalk {
  static default(str: string) {
    console.log(chalk.blue(str));
  }

  static red(str: string | string[]) {
    console.log(chalk.red(str));
  }

  static blue(str: string) {
    console.log(chalk.blue(str));
  }

  static green(str: string) {
    console.log(chalk.green(str));
  }
}
