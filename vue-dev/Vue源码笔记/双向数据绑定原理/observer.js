
class Observer{
  constructor(data){
    this.observer(data)
  }
  observer(data){
    if(!data || typeof data !== 'object'){
      return
    }
    Object.keys(data).forEach(key=>{
      this.defineReactive(data, key, data[key])
      this.observer(data[key])
    })
  }
  defineReactive(obj, key, value){
    let _this = this
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable:true,
      configurable:true,
      get(){
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue){
        if(newValue !== value){
          _this.observer(newValue)
          value = newValue
          dep.notify();
        }
      }
    })
  }
}