# 介绍
qian-cli除了初始化项目之外,还提供了create命令创建项目模块

例如创建login路由模块,以往操作:
1. 新建login.vue文件
2. 在`src/router/module`下新建login.ts文件
3. 在`src/router/index.ts`中导入login.ts文件

<br />

使用qian-cli脚手架后:

1. 在项目新建`qian-cli.json` (一劳永逸)
```json
{
  "router": {
    "routePath": "src/router/modules",
    "pagePath": "src/views",
    "alias": "@",
    "isPageDir": false
  },
  "store": {
    "storePath": "src/store/modules"
  }
}

```

2. 运行命令
~~~sh
qian-cli create login
? 请选择要创建什么模块 router
~~~

3. 没有3了,也就是说理论只需一步即可完成创建

