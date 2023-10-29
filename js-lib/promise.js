/**
 * Promise
 * 使用Promise来进行异步操作
 * 异步执行的具体过程，是通过浏览器的内核c++实现的，并不是js语言
 * resolve 执行成功的返回值，可以在回调函数中接收到该值
 * reject 执行失败的返回值，也可以在回调函数中接收到该值
 * then 和 catch 都是回调函数，可以分别接受成功和失败的回调值
 */
function fn1() {
  const a = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("执行完毕1");
      resolve("我是数据1");
    }, 1000);
  });
  return a;
}
fn1();

function fn2() {
  const b = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("执行完毕2");
      resolve("我是数据2");
    }, 1000);
  });
  return b;
}
fn2();

function fn3() {
  const c = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("执行完毕3");
      resolve("我是数据3");
    }, 1000);
  });
  return c;
}
fn3();

fn1()
  .then(function (data) {
    console.log(data);
    return fn2();
  })
  .then(function (data) {
    console.log(data);
    return fn3();
  })
  .then(function (data) {
    console.log(data);
  });

function fn4() {
  const d = new Promise(function (resolve, reject) {
    setTimeout(function () {
      let num1 = 3;
      if (num1 > 5) {
        resolve(num1);
      } else {
        reject("我失败了");
      }
    }, 1000);
  });
  return d;
}
fn4();

fn4()
  .then(function (data) {
    console.log(data);
    console.log(我还没被定义);
  })
  .catch(function (reason) {
    console.log(reason);
  });

Promise.all([fn1(), fn2(), fn3()]).then(function (results) {
  console.log(results);
});

Promise.allSettled([fn1(), fn2(), fn3()]).then(function (results) {
  console.log(results);
})

Promise.race([fn1(), fn2(), fn3()]).then(function (results) {
  console.log(results);
});

Promise.then((res) => { console.log(res) }).catch((error) => { console.log(error) }).finally(() => { console.log('结束了') })

const runPromiseSequence = (array, value) =>
  array.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(value)
  );

runPromiseSequence([fn1, fn2, fn3], "init");

/**
 * 
 * @param {Array} urls   请求数组
 * @param {Number} maxNum 同时最大请求数
 * @returns 
 */

function multiRequest(urls, maxNum) {
  const ret = [];
  let i = 0;
  let resolve;
  const promise = new Promise(r => resolve = r);
  const addTask = () => {
    if (i >= arr.length) {
      return resolve();
    }

    const task = request(urls[i++]).finally(() => {
      addTask();
    });
    ret.push(task);
  }

  while (i < maxNum) {
    addTask();
  }

  return promise.then(() => Promise.all(ret));
}

/**
 * 手动中断promise
 * @param {Promise} p1 Promise函数
 * @returns 
 */
function abortWrapper(p1) {
  let abort;
  let p2 = new Promise((resolve, reject) => { abort = reject });
  let p = Promise.race([p1, p2]);
  p.abort = abort;
  return p;
}
