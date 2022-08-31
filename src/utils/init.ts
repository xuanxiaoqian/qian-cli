import path from "path";
import fs from "fs";
import clear from "clear-console";
import Chalk from "./chalk";
import inquirer from "inquirer";
import sortDependencies, { deepMerge } from "./common";

export function checkName(name: string) {
  const inCurrent = name === ".";
  const projectName = inCurrent ? path.relative("../", process.cwd()) : name;
  const projectPath = inCurrent
    ? path.join(process.cwd(), name)
    : path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath) && !inCurrent) {
    Chalk.red(`${projectPath} 存在`);

    process.exit(1);
  }

  return { projectName, projectPath, isCwd: inCurrent ? true : false };
}

export async function selectFeature(): Promise<Array<string>> {
  clearConsole();

  Chalk.blue(`当前脚手架版本 v${require("../../package.json").version}`);
  Chalk.default("开始初始化项目:");
  Chalk.default("");

  const question = [
    {
      type: "checkbox",
      message: "选择你需要的工具,空格选择,回车完成",
      name: "feature",
      choices: [
        {
          value: "axios",
          name: "axios",
          checked: true,
        },
        {
          value: "pinia",
          name: "pinia",
          checked: true,
        },
        {
          value: "scss",
          name: "scss",
          checked: true,
        },
        {
          value: "TSX",
          name: "TSX",
          checked: true,
        },
        {
          value: "prettier",
          name: "prettier",
          checked: true,
        },
      ],
    },
  ];
  let answer = await inquirer.prompt(question);

  return answer.feature as Array<string>;
}

export function render(projectPath: string, feature: string[]) {
  let templatePath: any = path.join(__dirname, "../", "template");

  renderTemplate(path.join(templatePath, "base"), projectPath);

  feature.map((item) => {
    renderTemplate(path.join(templatePath, "code", item), projectPath);
  });
}

export function clearConsole(): void {
  clear();
}

function renderTemplate(src: string, dest: string) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (path.basename(src) === "node_modules") {
      return;
    }

    if (path.basename(src) === "root") {
      return;
    }

    // if it's a directory, render its subdirectories and files recursively
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file));
    }
    return;
  }

  const filename = path.basename(src);

  if (filename === "package.json" && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest, "utf8"));
    const newPackage = JSON.parse(fs.readFileSync(src, "utf8"));
    const pkg = sortDependencies(deepMerge(existing, newPackage));
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + "\n");
    return;
  }

  if (filename.startsWith("_")) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, "."));
  }

  fs.copyFileSync(src, dest);
}

export function Tips(projectName: string, isCwd: boolean) {
  console.log();
  Chalk.green("现在运行:");
  console.log();

  if (!isCwd) Chalk.green("  cd " + projectName);

  Chalk.green("  npm install");
  Chalk.green("  npm run dev");
}
