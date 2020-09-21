// 依赖收集
let dId = 0
class Dep{
  constructor() {
    this.id = dId++ // 每次实例化都生成一个id
    this.subs = [] // 让这个dep实例收集watcher
  }
  depend() {
    // Dep.target 就是当前的watcher
    if (Dep.target) {
      Dep.target.addDep(this) // 让watcher,去存放dep，然后里面dep存放对应的watcher，两个是多对多的关系
    }
  }
  notify() {
    // 触发更新
    this.subs.forEach(watcher => watcher.update())
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
}

let stack = []
// push当前watcher到stack 中，并记录当前watcer
function pushTarget(watcher) {
  Dep.target = watcher
  stack.push(watcher)
}
// 运行完之后清空当前的watcher
function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}
