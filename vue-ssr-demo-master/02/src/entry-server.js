import { createApp } from './app.js';
// 因为 server端在同一个服务器内，所以需要每个用户调用后返回自己的实例
export default context => {
  const { app } = createApp();

  return app;
}