import "./assets/main.css";
import Vuesax from "vuesax3";
import "vuesax3/dist/vuesax.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores/index";
import "boxicons/css/boxicons.min.css";
import "virtual:uno.css";
import "material-icons/iconfont/material-icons.css";
const app = createApp(App);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(pinia);
app.use(router);
app.use(Vuesax);

app.mount("#app");
