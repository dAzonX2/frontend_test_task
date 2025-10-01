import { createApp } from "vue";
import { createPinia } from "pinia";
import 'typeface-ibm-plex-mono';
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");