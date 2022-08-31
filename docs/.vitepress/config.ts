import { defineConfig } from "vitepress";

export default defineConfig({
  title: "qian-cli",
  description: "快速搭建vue3开发环境的脚手架",
  head: [
    ["link", { rel: "icon", href: "/xuanxiaoqian.png" }],
    [
      "meta",
      { name: "keywords", content: "qian-cli 首页,qian-cli 文档,轩小浅" },
    ],
    ["meta", { name: "author", content: "轩小浅" }],
  ],
  themeConfig: {
    logo: "/xuanxiaoqian.png",
    siteTitle: "qian-cli",
    socialLinks: [
      { icon: "github", link: "https://github.com/xuanxiaoqian/qian-cli" },
    ],
    nav: [
      { text: "指南", link: "/guide/about" },
      {
        text: "配置参考",
        link: "/configDoc/baseConfig/baseDir",
      },
      { text: "更多说明", link: "/more/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "介绍",
          items: [
            { text: "关于脚手架", link: "/guide/about" },
            { text: "安装", link: "/guide/installation" },
            { text: "发展历程", link: "/guide/history" },
          ],
        },
      ],
      "/configDoc/": [
        {
          text: "基础配置",
          items: [{ text: "目录结构", link: "/configDoc/baseConfig/baseDir" }],
        },
        {
          text: "可选配置",
          items: [
            { text: "axios", link: "/configDoc/optionConfig/axios/index" },
            { text: "pinia", link: "/configDoc/optionConfig/pinia/index" },
            { text: "scss", link: "/configDoc/optionConfig/scss/index" },
          ],
        },
      ],
    },
  },
  markdown: {
    externalLinks: { target: "_blank", rel: "nofollow noopener noreferrer" },
  },
});
