import { createApp } from 'vue';
import V3Button from 'button';
import App from './App.vue';

const app = createApp(App);

app.use(V3Button);

app.mount('#app');
