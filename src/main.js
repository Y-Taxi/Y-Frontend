import { createApp } from 'vue';
//import App from './App.vue'
import MainView from './view/MainView.vue';
import router from './router';
//import store from "./store";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8083";
const app = createApp(MainView);
app.config.globalProperties.axios = axios;
app.use(router).mount("#app");