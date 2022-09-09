# pinia

选择此配置后src文件夹下将会多一个文件夹 `src/store`
~~~diff
    .
   ├── src  
+  │   ├── store 
+  │   │   └── modules 
+  │   │       └── counter.ts
+  │   │   ├── index.ts 
~~~


`store/index.ts`
~~~ts
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
~~~

<br />

`store/modules/counter.ts`
~~~ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 2
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})

~~~
<br />

`main.ts`变化
~~~diff
  import { createApp } from 'vue'
+ import pinia from './store/index'
  import App from './App.vue'
  import router from './router/index'

  import './style/reset.css'

  const app = createApp(App)

+ app.use(pinia)
  app.use(router)

  app.mount('#app')
~~~