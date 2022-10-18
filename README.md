<h1 align="center">Qian-Cli</h1>
<p align="center">快速搭建vue3开发环境的脚手架</p>
<p align="center">
   <a href="https://www.npmjs.com/package/qian-cli">
    <img src="https://img.shields.io/npm/v/qian-cli.svg">
  </a>
  <a href="https://npmcharts.com/compare/qian-cli?minimal=true">
    <img src="https://img.shields.io/npm/dt/qian-cli.svg">
  </a>
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/dependencies-vue%E2%89%A53.2.0-green">
  </a>
   <a href="https://github.com/vitejs/vite">
    <img src="https://img.shields.io/badge/devDependencies-vite%E2%89%A53.0.7-green">
  </a>
<p align="center">
  <a href="http://qian-cli.xuanxiaoqian.com">文档网站</a>
  &nbsp;
</p>


---




## 介绍

传统的`vue-cli`、`create-vue`创建出来的项目功能都比较基础，不能满足开发需求，qian-cli在前者的基础上进一步配置，达到创建无需配置即可开发。



qian-cli还提供了快捷生成文件，无需手动创建文件、文件夹。



## 特点

- 便捷 一行简单命令即可完成繁琐配置

- 可选 选你所选 想你所想 懂你所懂

- 灵活 创建项目后，还能继续使用脚手架创建一系列模块

- 最新 开发模板都会维护，与时俱进



## 技术

1. 默认配置
   - Vue3
   - TypeScript
   - Vue-Router4
   - Vite
2. 可选配置
   - Axios
   - Pinia
   - Prettier
   - Scss
   - Tailwind
   - Tsx
   - `敬请期待...`

## 安装

> node版本需要  "node": "^14.18.0 || >=16.0.0" 

1. 安装到本地

   使用npm全局安装:

   ~~~sh
   npm i qian-cli -g
   ~~~

   <br />

   初始化一个`项目`:

   ~~~sh
   qian-cli init my-project
   ~~~

   <br />

   初始化远程git`模板`:

   ~~~sh
   qian-cli init git-project <你的仓库地址> [指定分支]
   ~~~

   <br />

   创建一个`模块`:

   ~~~sh
   qian-cli create moduleName
   ~~~



2. 无需安装到本地

   使用npx即用即走

   ~~~sh
   npx qian-cli init my-project.
   
   ...其他功能适用
   ~~~

   

## 疑问交流

QQ群: <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=LrFpPFoHAHFikBUJQqKjViRJIY1BH250&jump_from=webapi">qian-cli(746382337)</a>