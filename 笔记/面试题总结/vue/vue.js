function Vue (options) {
  this._init(options) // 初始化
  this.$mount() // 执行render函数
}
Vue.prototype._init = function (options) {
  const vm = this
  vm.$options = options // 把options挂载到this上
  if (options.data) {
    initState(vm) // 数据响应式
  }
  if (options.computed) {
    initComputed(vm) // 初始化计算属性
  }
  if (options.watch) {
    initWatch(vm) // 初始化watch
  }
}
// 挂载方法
Vue.prototype.$mount = function () {
  const vm = this
  new Watcher(vm, vm.$options.render, () => {}, true)
}

