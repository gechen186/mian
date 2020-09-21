let wid = 0
class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    }
    this.cb = cb
    this.options = options
    this.id = wid++
    this.deps = []
    this.depsId = new Set() // dep 已经收集过相同的watcher 就不要重复收集了
    this.value = this.get()
  }
  get() {
    const vm = this.vm
   pushTarget(this)
    let value = this.getter.call(vm, vm) // 执行函数
   popTarget()
    return value
  }
  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this);
    }
  }
  update(){
    this.get()
  }
}
