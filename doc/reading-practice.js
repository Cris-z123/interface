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

/**
 *
 * @param {Promise} promise2 Promise实例
 * @param {Any} result onfulfilled或onrejected的返回值
 * @param {Function} resolve promise2的resolve方法
 * @param {Function} reject promise2的reject方法
 */
const resolvePromise = (promise2, result, resolve, reject) => {
  if (result === promise2) {
    reject(new TypeError("error due to circular reference"));
  }

  let consumed = false;
  let thenable;

  if (result instanceof Promise) {
    if (result.status === "pending") {
      result.then(function (data) {
        resolvePromise(promise2, data, resolve, reject);
      }, reject);
    } else {
      result.then(resolve, reject);
    }
    return;
  }

  let isComplexResult = (target) =>
    (typeof target === "function" || typeof target === "object") &&
    target !== null;

  if (isComplexResult(result)) {
    try {
      thenable = result.then;

      if (typeof thenable === "function") {
        thenable.call(
          result,
          function (data) {
            if (consumed) {
              return;
            }
            consumed = true;

            return resolvePromise(promise2, data, resolve, reject);
          },
          function (error) {
            if (consumed) {
              return;
            }
            consumed = true;

            return reject(error);
          }
        );
      } else {
        resolve(result);
      }
    } catch (error) {
      if (consumed) {
        return;
      }
      consumed = true;

      return reject(error);
    }
  } else {
    resolve(result);
  }
};

Promise.prototype.then = function (
  onfulfilled = Function.prototype,
  onrejected = Function.prototype
) {
  onfulfilled =
    typeof onfulfilled === "function" ? onfulfilled : (data) => data;

  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error;
        };

  let promise2;

  if (this.status === "fulfilled") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = onfulfilled(this.value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (this.status === "rejected") {
    return (promise2 = new Promise(() => {
      setTimeout(() => {
        try {
          let result = onrejected(this.value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (this.status === "pending") {
    return (promise2 = new Promise(() => {
      this.onFulfilledArray.push(() => {
        try {
          let result = onfulfilled(this.value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });

      this.onRejectedArray.push(() => {
        try {
          let result = onrejected(this.reason);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }
};

Promise.prototype.catch = function (catchFunc) {
  return this.then(null, catchFunc);
};

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};

Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value);
  });
};

Promise.all = function (promiseArray) {
  if (!Array.isArray(promiseArray)) {
    throw new TypeError("The arguments should be an array!");
  }

  return new Promise((resolve, reject) => {
    try {
      let resultArray = [];

      const length = promiseArray.length;

      for (let i = 0; i < length; i++) {
        promiseArray[i].then((data) => {
          resultArray.push(data);

          if (resultArray.length === length) {
            resolve(resultArray);
          }
        }, reject);
      }
    } catch (error) {
      reject(error);
    }
  });
};

Promise.race = function (promiseArray) {
  if (!Array.isArray(promiseArray)) {
    throw new TypeError("The arguments should be an array!");
  }

  return new Promise((resolve, reject) => {
    try {
      const length = promiseArray.length;

      for (let i = 0; i < length; i++) {
        promiseArray[i].then(resolve, reject);
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * JS继承
 * @param {Object} Child 子对象
 * @param {Object} Parent 父对象
 */
function inherit(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);

  Child.prototype.constructor = Child;

  Child.super = Parent;

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(Child, Parent);
  } else if (Child._proto_) {
    Child._proto_ = Parent;
  } else {
    for (var k in Parent) {
      if (Parent.hasOwnProperty(k) && !(k in Child)) {
        Child[k] = Parent[k];
      }
    }
  }
}
