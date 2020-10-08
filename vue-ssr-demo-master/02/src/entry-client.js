import { createApp } from './app.js';
// client端是不同的环境，所以调用后直接挂在即可
const { app } = createApp();

app.$mount('#app');