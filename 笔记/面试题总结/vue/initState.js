function initState(vm) {
  let data = vm.$options.data; // 拿到配置的data属性值
  // 判断data 是函数还是别的类型
  data = vm._data = typeof data === "function" ? data.call(vm, vm) : data || {};
  const keys = Object.keys(data);
  let i = keys.length;
  while (i--) {
    // 从this上读取的数据全部拦截到this._data到里面读取
    // 例如 this.name 等同于  this._data.name
    proxy(vm, "_data", keys[i]);
  }
  observe(data); // 数据观察
}

// 数据观察函数
function observe(data) {
  if (typeof data !== "object" && data != null) {
    return;
  }
  return new Observer(data);
}

// 从this上读取的数据全部拦截到this._data到里面读取
// 例如 this.name 等同于  this._data.name
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]; // this.name 等同于  this._data.name
    },
    set(newValue) {
      return (vm[source][key] = newValue);
    },
  });
}

class Observer {
  constructor(value) {
    this.walk(value); // 给每一个属性都设置get set
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0, len = keys.length; i < len; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value); // 给对象设置get set
    }
  }
}

function defineReactive(data, key, value) {
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        // 如果取值时有watcher
        dep.depend(); // 让watcher保存dep，并且让dep 保存watcher，双向保存
      }
    },
    set(newValue) {
      if (newValue == value) return;
      observe(newValue); // 给新的值设置响应式
      value = newValue;
      dep.notify();
    },
  });
  observe(value); // 递归给数据设置get set
}
