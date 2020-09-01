var MVVM = require('./MVVM.js');

new MVVM({
  el: "#app",
  data: {
    message: { 
      a: "jwa" ,
      c:{
        e:'呵呵呵'
      }
    },
    b: "MVVM",
  },
});