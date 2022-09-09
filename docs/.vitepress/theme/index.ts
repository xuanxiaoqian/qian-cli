import Theme from "vitepress/theme";
import "./style/var.css";
import VuaImage from "../components/VuaImage/VuaImage.vue";

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('VuaImage', VuaImage)
  }
};
