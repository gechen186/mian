console.log('bind  deom');
function bindTest (a,b,c){
  console.log(`this:${this}`);
  console.log(a,b,c);
  return 'this is bindTest'
}

const bindFn = bindTest.bind({x:1}, 10, 20 ,30)
bindFn()