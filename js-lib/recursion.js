//递归实现 n！
function factorialize(num) {
    if (num < 2) {
        return 1
    }
    return num * factorialize(num - 1)
}

console.log(factorialize(5))



//递归实现字符串重复
function repeatStringNumTimes(str, num) {
    if (num <= 0) {
        return ""
    }
    return str + repeatStringNumTimes(str, num - 1)
}

repeatStringNumTimes("abc", 3);
