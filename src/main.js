import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import store from './store/index.js'
import router from './router.js'
import App from './App.vue'


const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount('#app');
