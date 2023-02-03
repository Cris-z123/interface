/**
 * splice 删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
 * pop 弹出原数组最后一个元素，，并返回该元素的值，数组长度减一
 * push 将一个或多个元素添加到数组的末尾，并返回该数组的新长度
 * shift 弹出原数组第一个值，并返回该元素的值，数组长度减一
 * unshift 将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)
 * sort 对原数组进行排序，默认将元素转化为字符串，比较UTF-8代码单元值
 * reverse 将原数组反转
 * map 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
 * filter 创建一个新数组，包含所有通过测试的元素
 * reduce forEach 不会直接改变调用它的对象，但是那个对象可能会被 callback 函数改变
 * forEach 对数组的每个元素执行一次给定的函数，不会直接改变调用它的对象，但是那个对象可能会被 callback 函数改变
 * concat 合并两个或多个数组，并返回一个新数组
 * join 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符
 * reduce acc（累计器）、cur（当前值）、idx（当前索引）、src（源数组）函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值
 */

let arr1 = [
  [4, 5, 1, 3],
  [13, 27, 18, 26],
  [32, 35, 37, 39],
  [1000, 1001, 857, 1],
];
let arr2 = [1, 2, 3, 4];

//多维数组中寻找每项最大值
function largestOfFour(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(Math.max(...arr[i]));
  }
  return newArr;
}

console.log(largestOfFour(arr1));
console.log(largestOfFour(arr2));

/**
 * Finders Keepers
 * This means that given an element x, the 'truth test' is passed if func(x) is true. If no element passes the test, return undefined.
 */

function findElement(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return arr[i];
    }
  }
  return undefined;
}

findElement([1, 2, 3, 4], (num) => num % 2 === 0);

/**
 * 使用splice和slice将arr1添加到arr2中，从索引为n的位置开始插入
 * @param {*} arr1
 * @param {*} arr2
 * @param {*} n
 */

//方法1
function frankenSplice(arr1, arr2, n) {
  let newArr = arr2.slice();
  newArr.splice(n, 0, ...arr1);
  return newArr;
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);

//方法2
function frankenSplice(arr1, arr2, n) {
  let newArr = arr2.slice();
  newArr.splice(n, 0, ...arr1);
  for (let i = 0; i < arr1.length; i++) {
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
  arr.push(num);
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    while (arr[i] === num) {
      return i;
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
    result.push(arr.splice(0, size));
  }
  if (arr.length) {
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
  let newArr = str.toLowerCase().split(" ");
  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].slice(1);
  }
  return newArr.join(" ");
}

titleCase("I'm a little tea pot");

/**
 * diff two arrays
 * @param {*} arr1
 * @param {*} arr2
 */

function diffArray(arr1, arr2) {
  var newArr = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) {
      newArr.push(arr1[i]);
    }
  }
  for (let j = 0; j < arr2.length; j++) {
    if (arr1.indexOf(arr2[j]) === -1) {
      newArr.push(arr2[j]);
    }
  }
  return newArr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

Array.prototype.reduce =
  Array.prototype.reduce ||
  function (func, initialValue) {
    var arr = this;
    var base = typeof initialValue === "undefined" ? arr[0] : initialValue;
    var startPoint = typeof initialValue === "undefined" ? "1" : "0";

    arr.slice(startPoint).forEach(function (val, index) {
      base = func(base, val, index + startPoint, arr);
    });

    return base;
  };

const only = (obj = {}, keys) => {
  if ("string" === typeof keys) keys = keys.split(/ +/);

  return keys.reduce((ret, key) => {
    if (null === obj[key]) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
};

let o = {
  a: "a",
  b: "b",
  c: "c",
};

console.log(only(o, ["a", "b"]));
