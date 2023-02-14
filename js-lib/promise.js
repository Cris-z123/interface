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

const runPromiseSequence = (array, value) =>
  array.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(value)
  );

runPromiseSequence([fn1, fn2, fn3], "init");
