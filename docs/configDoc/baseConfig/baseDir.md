# 目录结构
```d
.
├── public #公共文件
│   └── vite.svg #网站图标
├── src  #开发目录
│   ├── assets #资源文件
│   │   ├── images #图片资源
│   │   └── style #样式资源
│   │       └── reset.css #页面重置
│   ├── components #组件
│   ├── hooks 
│   │   └── usePoint.ts
│   ├── layout #全局布局文件
│   ├── router #路由
│   │   └── modules #路由模块
│   │       ├── home.ts #主页
│   │       └── pathMatch.ts #通配符匹配不存在的路由
│   │   ├── index.ts #统一路由
│   ├── utils #工具文件夹
│   └── views #页面文件夹
│       ├── 404.vue
│       └── Home.vue
├── types #typescript类型提示
│   ├── auto-import.d.ts #自动导入
│   ├── import-meta.d.ts #环境变量
│   └── vite-env.d.ts #vite
│   ├── App.vue
│   ├── main.ts
├── .env.development #开发环境变量
├── .env.production #生成环境变量
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```