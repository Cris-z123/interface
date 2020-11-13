let arr1 = [[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]
let arr2 = [1, 2, 3, 4]


//多维数组中寻找每项最大值
function largestOfFour(arr) {
    let newArr = []
    for(let i=0; i<arr.length; i++) {
        newArr.push(Math.max(...arr[i]))
    }
    return newArr
}

console.log(largestOfFour(arr1))
console.log(largestOfFour(arr2))