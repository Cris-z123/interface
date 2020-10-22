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