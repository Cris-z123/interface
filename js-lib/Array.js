/**
 * splice会改变原数组，slice不会，他们都可以完成数组的切割
 * pop
 * push
 * shift
 * unshift
 * sort
 * reverse
 * map
 * filter
 * reduce
 * forEach
 * concat
 * join
 */




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




/**
 * Finders Keepers
 * This means that given an element x, the 'truth test' is passed if func(x) is true. If no element passes the test, return undefined.
*/

function findElement(arr, func) {
    for(let i=0; i<arr.length; i++) {
        if(func(arr[i])) {
            return arr[i]
        }
    }
    return undefined
}

findElement([1, 2, 3, 4], num => num % 2 === 0);



/**
 * 使用splice和slice将arr1添加到arr2中，从索引为n的位置开始插入
 * @param {*} arr1 
 * @param {*} arr2 
 * @param {*} n 
 */

 //方法1
function frankenSplice(arr1, arr2, n) {
    let newArr = arr2.slice()
    newArr.splice(n, 0, ...arr1)
    return newArr;
  }
  
frankenSplice([1, 2, 3], [4, 5, 6], 1);

//方法2
function frankenSplice(arr1, arr2, n) {
    let newArr = arr2.slice()
    newArr.splice(n, 0, ...arr1)
    for(let i=0; i<arr1.length; i++) {
        newArr.splice(n, 0, arr1[i]);
        n++;
    }
    return newArr;
  }
  
frankenSplice([1, 2, 3], [4, 5, 6], 1);


/**
 * 将num插入arr并排序,返回num的索引值.num插入位置为小于它的值且大于它的两个值之间
 * @param {*} arr 
 * @param {*} num 
 */

function getIndexToIns(arr, num) {
    arr.push(num)
    arr.sort((a, b) => a - b )
    for(let i=0; i<arr.length; i++) {
      while(arr[i] === num){
        return i
      }
    }
  }
  
  getIndexToIns([40, 60], 50);
  

/**
 * 返回一个二维数组，以size为长度，分隔arr
 * @param {*} arr 
 * @param {*} size 
 */

//方法1
function chunkArrayInGroups(arr, size) {
    let result = [];

    while (arr.length > size) {
        result.push(arr.splice(0, size))
    }
    if (arr.length){
        result.push(arr);
    }

    return result;
}
//方法2
function chunkArrayInGroups(arr, size) {
    let newArr = [];
    while (arr.length > 0) {
        newArr.push(arr.splice(0, size));
    }
    return newArr; 
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);




/**
 * 输入一个字符串将首字母大写
 */

function titleCase(str) {
    let newArr = str.toLowerCase().split(" ")
    for(let i=0; i<newArr.length; i++) {
        newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].slice(1)
    }
    return newArr.join(" ")
}

titleCase("I'm a little tea pot")