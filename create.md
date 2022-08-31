## 1. 项目初始化

初始化项目

~~~sh
npm init -y && npm i typescript && npx tsc --init
~~~



新建文件夹

~~~sh
mkdir src && touch src/index.ts
~~~



修改tsconfig.json

~~~json
{
  "compilerOptions": {
    "outDir": "./lib",
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}

~~~



开发实时编译

~~~sh
npm i ts-node-dev -D
~~~



修改`package.json`

~~~json
{
  "scripts": {
    "dev:comment": "启动开发环境",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  }
}
~~~

