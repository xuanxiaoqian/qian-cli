# 创建router模块

## 前提
> 前提是你需要在`src/router/index.ts`文件下使用以下方式导入其他路由模块

~~~ts
const modules: any = import.meta.glob('./modules/*.ts', { eager: true })

for (const path in modules) {
  routes.push(modules[path].default)
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  strict: false
})
~~~
我们使用glob来进行动态导入,从而无需手动导入其他路由模块

<br />

## 创建步骤
1. 在你的项目根目录下创建一个`qian-cli.json`文件夹:
~~~json
{
  "router": {
    "routePath": "src/router/modules",
    "pagePath": "src/views",
    "alias": "@",
    "isPageDir": false
  },
}
~~~
上述属性：
- router代表路由模块配置
    - routePath代表路由配置文件放在哪个文件夹下
    - pagePath代表页面生成文件放在哪个文件夹下
    - alias代表你项目src的别名是什么,用于生成路由文件里面的component: () => - import('@/xxx/xx.vue'),
    - isPageDir代表页面生成是否生成文件夹

<br />
2. 命令创建

~~~sh
qian-cli create login
? 请选择要创建什么模块 router
~~~

运行上面的命令后你的项目变化：
~~~diff
    .
   ├── src  
   │   ├── router 
   │   │   └── modules 
   │   │       ├── home.ts 
   │   │       └── pathMatch.ts 
+  │   │       └── login.ts
   │   │   ├── index.ts 
   │   ├── utils
   │   └── views 
   │       ├── 404.vue
   │       └── Home.vue
+  │       └── login.vue
~~~
<br/>

`src/router/modules/login.ts`
~~~ts
import { RouteRecordRaw } from 'vue-router'

const loginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login.vue'),
  children: [],
}

export default loginRoute
~~~

`src/router/views/login.vue`
~~~vue
<template>
  <div clas="login">login</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
~~~


## 创建子路由模块
qian-cli会自动识别模块名的`/`来创建子路由，当前只支持第一层子路由
~~~sh
qian-cli create login/test
? 请选择要创建什么模块 router
~~~
运行上面的命令后你的项目变化：
~~~diff
    .
   ├── src  #开发目录
   │   ├── router #路由
   │   │   └── modules #路由模块
   │   │       ├── home.ts #主页
   │   │       └── pathMatch.ts #通配符匹配不存在的路由
   │   │       └── login.ts
   │   │   ├── index.ts #统一路由
   │   ├── utils #工具文件夹
   │   └── views #页面文件夹
   │       ├── 404.vue
   │       └── Home.vue
   │       └── login.vue
+  │       └── test.vue
~~~

<br />

`src/router/modules/login.ts`
~~~ts
import { RouteRecordRaw } from 'vue-router'

const loginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login.vue'),
  children: [
    {
      path: 'test',
      name: 'test',
      component: () => import('@/views/test.vue'),
    },
  ],
}

export default loginRoute
~~~

`src/router/views/test.vue`
~~~vue
<template>
  <div clas="test">test</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
~~~