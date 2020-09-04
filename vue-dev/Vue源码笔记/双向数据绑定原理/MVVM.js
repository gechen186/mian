// 1. 创建 mvvm 类
class MVVM {
  constructor(options) {
    // 将 el和 data赋值，并且如果有 el则开始模板编译
    this.$el = options.el;
    this.$data = options.data;
    if (this.$el) {
      new Observer(this.$data)
      this.proxyData(this.$data);
      new Compile(this.$el, this);
    }
  }
  proxyData(data){
    Object.keys(data).forEach(key=>{
        Object.defineProperty(this,key,{
            get(){
                return data[key]
            },
            set(newValue){
                data[key] = newValue
            }
        })
    })
}
}
