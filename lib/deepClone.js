function deepClone1(obj) {
    let target = {};
    for(let key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            if(typeof obj[key] === 'object') {
                target[key] = deepClone(obj[key]);
            } else {
                target[key] = obj[key]
            }
        }
    }
    return target;
}



function deepClone2(obj) {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 缺点1：不能深拷贝RegExp、error、时间、函数、undefined对象
 * 缺点2：对象存在循环引用也无法深拷贝
 * 缺点3：只能序列化对象的可枚举的自有属性
 */
