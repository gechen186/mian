class People {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`你好：${this.name}`);
  }
}

class Student extends People {
  constructor(name, num) {
    super(name);
    this.num = num;
  }
  sayBey() {
    console.log(`再见：${this.name} ${this.num}`);
  }
}


const xialuo = new Student("小明", 100);
console.log(xialuo instanceof Object);
// xiaoluo.__proto__ ==> Student.prototype
// Student.prototype.__proto__ ==>  People.People

// console.log(xiaoming.num);
// xiaoming.sayHi();
// xiaoming.sayBey();
