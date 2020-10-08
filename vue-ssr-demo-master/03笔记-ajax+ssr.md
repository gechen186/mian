### 1. 服务端拿异步数据的步骤在哪做？
 - server端只有 beforeCreate和 create两个生命周期，因为 server端只需要进行 html结构的拼接，不需要渲染和挂载
 - client端是在 create或 mounted中发 Ajax然后放到 this.data中，然后vue监听到数据变化，通过 DOM Diff，打patch，然后更新 DOM，但是 server中 没有 mounted周期，并且因为请求是异步的，可能请求结束后，html结构都已经拼接完成
 - 1. 在渲染前，要预先获取所有需要的异步数据，然后存到Vuex的store中。
 - 2. 在后端渲染时，通过Vuex将获取到的数据注入到相应组件中。
 - 3. 把store中的数据设置到window.__INITIAL_STATE__属性中。
 - 4. 在浏览器环境中，通过Vuex将window.__INITIAL_STATE__里面的数据注入到相应组件中。

正常情况下，通过这几个步骤，服务端吐出来的html字符串相应组件的数据都是最新的，所以第4步并不会引起DOM更新，但如果出了某些问题，吐出来的html字符串没有相应数据，Vue也可以在浏览器端通过“Vuex注入数据，进行DOM”更新。
 - 在 app.js中创建 store并且注入到 vue中
 重点：
 - 重点：  看03-entry-server.js 
  ```
      // 拿到每个组件
      let components = App.components;
      let asyncDataPromiseFns = [];
      // 遍历每个组件，如果当中有 asyncData，则在 server端中将 store传进 asyncData中
      Object.values(components).forEach(component => {
        if (component.asyncData) {
          asyncDataPromiseFns.push(component.asyncData({ store }));
        }
      });
      我们通过导出的App拿到了所有它下面的components，然后遍历，找出哪些component有asyncData方法，有的话调用并传入store，该方法会返回一个Promise，我们使用Promise.all等所有的异步方法都成功返回，才resolve(app)。

  ```
  

### 2. 如何确定哪些组件需要获取异步数据？

### 3. 获取到异步数据之后要如何塞回到组件内？