/**
 * 手写一个new
 * 1.创建一个新对象
 * 2.将对象的原型挂载是新对象上
 * 3.将对象的this绑定返回值上
 * 4.如果函数没有返回值，就返回这个新对象，否则返回值
 */
function myNew1() {
  let obj = new Object();
  obj._proto_ = ctx.prototype;
  let res = ctx.call(obj, ...args);
  return res instanceof Object ? res : obj;
}

function myNew2() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;

  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }

  newObject = Object.create(constructor.prototype);
  result = constructor.apply(newObject, arguments);
  let flag = result && (typeof result === "object" || typeof result === "function");
  return flag ? result : newObject;
}
