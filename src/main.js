import App from "./App.vue";
import { createApp } from "vue";
import "./index.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./components/routes/index";

const app = createApp(App).use(ElementPlus).use(router).mount("#app");
