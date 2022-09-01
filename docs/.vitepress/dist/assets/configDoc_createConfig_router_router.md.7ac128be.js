import{_ as s,c as n,o as a,a as l}from"./app.a3ca1428.js";const i=JSON.parse('{"title":"\u521B\u5EFArouter\u6A21\u5757","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u524D\u63D0","slug":"\u524D\u63D0","link":"#\u524D\u63D0","children":[]},{"level":2,"title":"\u521B\u5EFA\u6B65\u9AA4","slug":"\u521B\u5EFA\u6B65\u9AA4","link":"#\u521B\u5EFA\u6B65\u9AA4","children":[]},{"level":2,"title":"\u521B\u5EFA\u5B50\u8DEF\u7531\u6A21\u5757","slug":"\u521B\u5EFA\u5B50\u8DEF\u7531\u6A21\u5757","link":"#\u521B\u5EFA\u5B50\u8DEF\u7531\u6A21\u5757","children":[]}],"relativePath":"configDoc/createConfig/router/router.md"}'),p={name:"configDoc/createConfig/router/router.md"},o=l(`<h1 id="\u521B\u5EFArouter\u6A21\u5757" tabindex="-1">\u521B\u5EFArouter\u6A21\u5757 <a class="header-anchor" href="#\u521B\u5EFArouter\u6A21\u5757" aria-hidden="true">#</a></h1><h2 id="\u524D\u63D0" tabindex="-1">\u524D\u63D0 <a class="header-anchor" href="#\u524D\u63D0" aria-hidden="true">#</a></h2><blockquote><p>\u524D\u63D0\u662F\u4F60\u9700\u8981\u5728<code>src/router/index.ts</code>\u6587\u4EF6\u4E0B\u4F7F\u7528\u4EE5\u4E0B\u65B9\u5F0F\u5BFC\u5165\u5176\u4ED6\u8DEF\u7531\u6A21\u5757</p></blockquote><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> modules</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">glob</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./modules/*.ts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">eager</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> (</span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> path </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> modules) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">routes</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">modules</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">path</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">default</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> router </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createRouter</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">history</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createWebHashHistory</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">routes</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> routes</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">strict</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u4F7F\u7528glob\u6765\u8FDB\u884C\u52A8\u6001\u5BFC\u5165,\u4ECE\u800C\u65E0\u9700\u624B\u52A8\u5BFC\u5165\u5176\u4ED6\u8DEF\u7531\u6A21\u5757</p><br><h2 id="\u521B\u5EFA\u6B65\u9AA4" tabindex="-1">\u521B\u5EFA\u6B65\u9AA4 <a class="header-anchor" href="#\u521B\u5EFA\u6B65\u9AA4" aria-hidden="true">#</a></h2><ol><li>\u5728\u4F60\u7684\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E00\u4E2A<code>qian-cli.json</code>\u6587\u4EF6\u5939:</li></ol><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">router</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">routePath</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/router/modules</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">pagePath</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/views</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">alias</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">isPageDir</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u4E0A\u8FF0\u5C5E\u6027\uFF1A</p><ul><li>router\u4EE3\u8868\u8DEF\u7531\u6A21\u5757\u914D\u7F6E <ul><li>routePath\u4EE3\u8868\u8DEF\u7531\u914D\u7F6E\u6587\u4EF6\u653E\u5728\u54EA\u4E2A\u6587\u4EF6\u5939\u4E0B</li><li>pagePath\u4EE3\u8868\u9875\u9762\u751F\u6210\u6587\u4EF6\u653E\u5728\u54EA\u4E2A\u6587\u4EF6\u5939\u4E0B</li><li>alias\u4EE3\u8868\u4F60\u9879\u76EEsrc\u7684\u522B\u540D\u662F\u4EC0\u4E48,\u7528\u4E8E\u751F\u6210\u8DEF\u7531\u6587\u4EF6\u91CC\u9762\u7684component: () =&gt; - import(&#39;@/xxx/xx.vue&#39;),</li><li>isPageDir\u4EE3\u8868\u9875\u9762\u751F\u6210\u662F\u5426\u751F\u6210\u6587\u4EF6\u5939</li></ul></li></ul><br> 2. \u547D\u4EE4\u521B\u5EFA <div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">qian-cli create login</span></span>
<span class="line"><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> \u8BF7\u9009\u62E9\u8981\u521B\u5EFA\u4EC0\u4E48\u6A21\u5757 router</span></span>
<span class="line"></span></code></pre></div><p>\u8FD0\u884C\u4E0A\u9762\u7684\u547D\u4EE4\u540E\u4F60\u7684\u9879\u76EE\u53D8\u5316\uFF1A</p><div class="language-diff"><button class="copy"></button><span class="lang">diff</span><pre><code><span class="line"><span style="color:#A6ACCD;">    .</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u251C\u2500\u2500 src  </span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u251C\u2500\u2500 router </span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502   \u2514\u2500\u2500 modules </span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502       \u251C\u2500\u2500 home.ts </span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502       \u2514\u2500\u2500 pathMatch.ts </span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">  \u2502   \u2502       \u2514\u2500\u2500 login.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502   \u251C\u2500\u2500 index.ts </span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u251C\u2500\u2500 utils</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2514\u2500\u2500 views </span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502       \u251C\u2500\u2500 404.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502       \u2514\u2500\u2500 Home.vue</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">  \u2502       \u2514\u2500\u2500 login.vue</span></span>
<span class="line"></span></code></pre></div><br><p><code>src/router/modules/login.ts</code></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">RouteRecordRaw</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-router</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> loginRoute</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RouteRecordRaw</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/login</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">login</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">component</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/views/login.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> loginRoute</span></span>
<span class="line"></span></code></pre></div><p><code>src/router/views/login.vue</code></p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">clas</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">login</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">login</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="\u521B\u5EFA\u5B50\u8DEF\u7531\u6A21\u5757" tabindex="-1">\u521B\u5EFA\u5B50\u8DEF\u7531\u6A21\u5757 <a class="header-anchor" href="#\u521B\u5EFA\u5B50\u8DEF\u7531\u6A21\u5757" aria-hidden="true">#</a></h2><p>qian-cli\u4F1A\u81EA\u52A8\u8BC6\u522B\u6A21\u5757\u540D\u7684<code>/</code>\u6765\u521B\u5EFA\u5B50\u8DEF\u7531\uFF0C\u5F53\u524D\u53EA\u652F\u6301\u7B2C\u4E00\u5C42\u5B50\u8DEF\u7531</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#A6ACCD;">qian-cli create login/test</span></span>
<span class="line"><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> \u8BF7\u9009\u62E9\u8981\u521B\u5EFA\u4EC0\u4E48\u6A21\u5757 router</span></span>
<span class="line"></span></code></pre></div><p>\u8FD0\u884C\u4E0A\u9762\u7684\u547D\u4EE4\u540E\u4F60\u7684\u9879\u76EE\u53D8\u5316\uFF1A</p><div class="language-diff"><button class="copy"></button><span class="lang">diff</span><pre><code><span class="line"><span style="color:#A6ACCD;">    .</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u251C\u2500\u2500 src  #\u5F00\u53D1\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u251C\u2500\u2500 router #\u8DEF\u7531</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502   \u2514\u2500\u2500 modules #\u8DEF\u7531\u6A21\u5757</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502       \u251C\u2500\u2500 home.ts #\u4E3B\u9875</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502       \u2514\u2500\u2500 pathMatch.ts #\u901A\u914D\u7B26\u5339\u914D\u4E0D\u5B58\u5728\u7684\u8DEF\u7531</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502       \u2514\u2500\u2500 login.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2502   \u251C\u2500\u2500 index.ts #\u7EDF\u4E00\u8DEF\u7531</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u251C\u2500\u2500 utils #\u5DE5\u5177\u6587\u4EF6\u5939</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502   \u2514\u2500\u2500 views #\u9875\u9762\u6587\u4EF6\u5939</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502       \u251C\u2500\u2500 404.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502       \u2514\u2500\u2500 Home.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">   \u2502       \u2514\u2500\u2500 login.vue</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">  \u2502       \u2514\u2500\u2500 test.vue</span></span>
<span class="line"></span></code></pre></div><br><p><code>src/router/modules/login.ts</code></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">RouteRecordRaw</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-router</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> loginRoute</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RouteRecordRaw</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/login</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">login</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">component</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/views/login.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#82AAFF;">component</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/views/test.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> loginRoute</span></span>
<span class="line"></span></code></pre></div><p><code>src/router/views/test.vue</code></p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">clas</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">test</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,31),e=[o];function t(c,r,D,y,F,C){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{i as __pageData,u as default};
