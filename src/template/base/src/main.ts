import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";

import "./assets/style/reset.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
