/**
 * 手写instanceof
 * 1.确定输入值的原型
 * 2.循环查找原形链，对照两个值的原型
 * @param {*} right 
 * @param {*} left 
 */

function myInstanceof(right, left) {
    let proto = Object.getPrototypeOf(left) //返回指定对象的原型

    while(true) {
        if(proto === null) {
            return false
        } else if(proto === right.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
}
