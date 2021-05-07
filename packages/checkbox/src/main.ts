import { createApp } from 'vue';
import V3Button from 'button';
import V3Input from 'input';
import V3Radio from 'radio';
import App from './App.vue';

const app = createApp(App);

app.use(V3Button);
app.use(V3Input);
app.use(V3Radio);

app.mount('#app');
