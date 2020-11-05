/**
 * 手写一个new
 * 1.创建一个新对象
 * 2.将对象的原型挂载是新对象上
 * 3.将对象的this绑定返回值上
 * 4.如果函数没有返回值，就返回这个新对象，否则返回值
 */
function myNew() {
    let obj = new Object();
    obj._proto_ = ctx.prototype;
    let res = ctx.call(obj, ...args)
    return res instanceof Object ? res : obj
}