import { createApp } from './app.js';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, store, App } = createApp();
    // 拿到每个组件
    let components = App.components;
    let asyncDataPromiseFns = [];
    //遍历每个组件，如果当中有 asyncData，则在 server端中将 store传进 asyncData中
    Object.values(components).forEach(component => {
      if (component.asyncData) {
        asyncDataPromiseFns.push(component.asyncData({ store }));
      }
    });
  
    Promise.all(asyncDataPromiseFns).then((result) => {
      // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
      context.state = store.state;
  
      console.log(222);
      console.log(store.state);
      console.log(context.state);
      console.log(context);
  
      resolve(app);
    }, reject);
  });
}