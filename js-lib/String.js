const str = "The quick brown fox jumped over the lazy dog"


//完全翻转
function reverseStr1(param) {
    return param.split("").reverse().join("")
}

console.log(reverseStr1(str))

//仅翻转顺序
function reverseStr2(param) {
    return param.split(" ").reverse().join(" ")
}
console.log(reverseStr2(str))


//返回字符串中最长的单词

function findLongestWordLength(str) {
    let longStr = str.split(" ")
    let newArr = []
    for(let i=0; i<longStr.length; i++) {
        newArr.push(longStr[i].length)
    }
    return Math.max(...newArr)
}

console.log(findLongestWordLength(str))


// 检查字符串是否以target结尾
function confirmEnding(str, target) {
    return str.slice(str.length - target.length) === target
}

console.log(findLongestWordLength("Bastian", "n"))

/**
 * Truncate a string (first argument) if it is longer than the given maximum string length (second argument). 
 * Return the truncated string with a ... ending.
 * */

function truncateString(str, num) {
    if(str.length > num) {
      return str.slice(0, num) + "..."
    }
    return str
  }
  console.log(truncateString(str, 8))