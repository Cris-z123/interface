/**
 * 顺序执行多个函数
 * @param  {Function} funcs 函数
 * @returns
 */
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

compose(console.log(1), console.log(2));

/**
 * 二维数组拉平
 */
const TwoDimensionalArray = [
  [1, 1],
  [2, 2],
];

TwoDimensionalArray.reduce((acc, cur) => {
  return acc.concat(cur);
}, []);

/**
 * 数据类型校验器
 * @param {any} x
 * @returns
 */
function typeValidator(x) {
  if (x === null) return "null";

  if (typeof x !== "object") return typeof x;

  return Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
}

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

const determineTrafficLight = (light) => {
  if (light === "red") {
    red();
  } else if (light === "green") {
    green();
  } else if (light === "yellow") {
    yellow();
  }
};

const trafficLight = (timer, light) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(determineTrafficLight(light));
    }, timer);
  });

const step = () => {
  trafficLight(3000, "red")
    .then(() => trafficLight(1000, "green"))
    .then(() => trafficLight(2000, "yellow"))
    .then(step)
    .catch((e) => new Error());
};

const step = async () => {
  await trafficLight(3000, "red");
  await trafficLight(1000, "green");
  await trafficLight(2000, "yellow");
  step();
};

/**
 * 并发请求，并限制最大并发数
 * @param {String || Array} urlIds 接口地址
 * @param {Promise} loadImg 接口请求
 * @param {Number} limit 最大并发限制数
 * @returns
 */
const loadByLimit = (urlIds, loadImg, limit) => {
  const urlIdsCopy = [...urlIds];

  if (urlIdsCopy.length <= limit) {
    const promiseArray = urlIds.map((urlId) => loadImg(urlId));
    return Promise.all(promiseArray);
  }

  const promiseArray = urlIdsCopy
    .splice(0, limit)
    .map((urlId) => loadImg(urlId));

  urlIdsCopy
    .reduce(
      (prevPromise, urlId) =>
        prevPromise
          .then(() => Promise.race(promiseArray))
          .catch((error) => console.log(error))
          .then((resolvedId) => {
            let resolvedIdPosition = promiseArray.findIndex(
              (id) => resolvedId === id
            );

            promiseArray.splice(resolvedIdPosition, 1);
            promiseArray.push(loadImg(urlId));
          }),
      Promise.resolve()
    )
    .then(() => Promise.all(promiseArray));
};

/**
 * my promise
 * @param {*} executor  执行器
 */
function Promise(executor) {
  this.status = "pending";
  this.value = null;
  this.reason = null;

  this.onFulfilledArray = [];
  this.onRejectedArray = [];

  const resolve = (value) => {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (this.status === "pending") {
        this.value = value;
        this.status = "fulfilled";

        this.onFulfilledArray.forEach((func) => func(value));
      }
    });
  };

  const reject = (reason) => {
    setTimeout(() => {
      if (this.status === "pending") {
        this.reason = reason;
        this.status = "rejected";

        this.onRejectedArray.forEach((func) => func(reason));
      }
    });
  };

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
  onfulfilled =
    typeof onfulfilled === "function" ? onfulfilled : (data) => data;

  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error;
        };

  if (this.status === "fulfilled") {
    onfulfilled(this.value);
  }
  if (this.status === "rejected") {
    onrejected(this.reason);
  }
  if (this.status === "pending") {
    this.onFulfilledArray.push(onfulfilled);
    this.onRejectedArray.push(onrejected);
  }
};
