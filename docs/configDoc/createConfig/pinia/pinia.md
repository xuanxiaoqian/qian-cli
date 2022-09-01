
# 创建pinia模块

在你的项目根目录下创建一个`qian-cli.json`文件夹:
~~~json
{
  "store": {
    "storePath": "src/store/modules"
  }
}
~~~
上述属性：
- store代表pinia模块配置
    - storePath代表pinia生成文件放在哪个文件夹下

<br />

命令创建

~~~sh
qian-cli create login
? 请选择要创建什么模块 store
~~~

运行上面的命令后你的项目变化：
~~~diff
    .
   ├── src  
   │   ├── store 
   │   │   └── modules 
   │   │       ├── counter.ts 
+  │   │       └── user.ts
   │   │   ├── index.ts 
   │   ├── utils
   │   └── views 
   │       ├── 404.vue
   │       └── Home.vue
~~~
<br/>

`src/store/modules/user.ts`
~~~ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({}),
  getters: {},
  actions: {},
})

~~~