class HD{
  static PENDING = 'pending'
  static FULFILLED = 'fufilled'
  static REJECTED = 'rejected'
  constructor(fn){
    this.status = HD.PENDING
    this.value = null
    this.reason = null
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(value){
    if(this.status === HD.PENDING){
      this.status = HD.FULFILLED
      this.value = value
    }

  }
  reject(reason){
    if(this.status === HD.PENDING){
      this.status = HD.REJECTED
      this.reason = reason
    }
  }
}

