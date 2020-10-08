import Vue from 'vue';
import App from './App.vue';

// 封装工厂函数，每次调用都返回一个新的实例
export function createApp() {
  const app = new Vue({
    render: h => h(App)
  });

  return { 
    app
   };
}