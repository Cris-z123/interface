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

const step1 = () => {
  trafficLight(3000, "red")
    .then(() => trafficLight(1000, "green"))
    .then(() => trafficLight(2000, "yellow"))
    .then(step1)
    .catch((e) => new Error());
};

const step2 = async () => {
  await trafficLight(3000, "red");
  await trafficLight(1000, "green");
  await trafficLight(2000, "yellow");
  step2();
};

/**
 * 并发请求，并限制最大并发数
 * @param {String || Array} urlIds  接口地址
 * @param {Promise} loadImg         接口请求
 * @param {Number} limit            最大并发限制数
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

/**
 * flexible布局
 * 监听DOMContent、resize、pageshow事件，来设定html的font-size
 */
!(function (e, t) {
  var n = t.documentElement,
    d = e.devicePixelRatio || 1;

  function i() {
    var e = n.clientWidth / 3.75;
    n.style.fontSize = e + "px";
  }

  if (
    ((function e() {
      t.body
        ? (t.body.style.fontSize = "16px")
        : t.addEventListener("DOMContentLoaded", e);
    })(),
      i(),
      e.addEventListener("resize", i),
      e.addEventListener("pageshow", function (e) {
        e.persisted && i();
      }),
      2 <= d)
  ) {
    var o = t.createElement("body"),
      a = t.createElement("div");
    (a.style.border = ".5px solid transparent"),
      o.appendChild(a),
      n.appendChild(0),
      1 === a.offsetHeight && n.classList.add("hairlines"),
      n.removeChild(0);
  }
})(window, document);

/**
 * 判断移动端横/竖屏
 */
window.addEventListener("resize", () => {
  if (window.orientation === 180 || window.orientation === 0) {
    console.log("竖屏");
  }
  if (window.orientation === 90 || window.orientation === -90) {
    console.log("横屏");
  }
});

/**
 * 实现数据响应式(Object.defineProperty())
 * 不能监听数组变化，需重写数组方法
 * 需遍历对象每个属性，且需要对嵌套结构进行深层遍历
 * 底层不再是被优化重点
 * @param {Object} data
 * @returns
 */

const arrExtend = Object.create(Array.prototype);

const arrMethods = [
  "pop",
  "push",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

arrMethods.forEach((method) => {
  const oldMethod = Array.prototype[method];
  const newMethod = function (...args) {
    oldMethod.apply(this, args);
  };
  arrExtend[method] = newMethod;
});

Array.prototype = Object.assign(Array.prototype, arrExtend);

const observe1 = (data) => {
  if (!data || typeof data !== "object") return;

  Object.keys(data).forEach((key) => {
    let currentValue = data[key];

    observe1(currentValue);

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        return currentValue;
      },
      set(newValue) {
        currentValue = newValue;
      },
    });
  });
};

/**
 * 实现数据响应式(Proxy())
 * 支持整个对象，不用遍历对象每个属性
 * 支持代理数组的变化
 * 底层将被厂商持续优化
 * @param {Object} data
 * @returns
 */
const observe2 = (data) => {
  if (!data || Object.prototype.toString.call(data) !== "[object, Object]") {
    return;
  }

  Object.keys(data).forEach((key) => {
    let currentValue = data[key];

    if (typeof currentValue === "object") {
      observe2(currentValue);

      data[key] = new Proxy(currentValue, {
        set(target, property, value, receiver) {
          if (property !== "length") {
            console.log(
              `setting ${key} value now, setting value is`,
              currentValue
            );
          }
          return Reflect.set(target, property, value, receiver);
        },
      });
    } else {
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
          return currentValue;
        },
        set(newValue) {
          currentValue = newValue;
        },
      });
    }
  });
};

/**
 * 简易版vue模板编译
 * @param {*} el
 * @param {*} data
 * @returns
 */
function compile(el, data) {
  let fragment = document.createDocumentFragment(); // 创建一个新的空白的文档片段

  while ((child = el.firstChild)) {
    fragment.appendChild(child);
  }

  function replace(fragment) {
    Array.from(fragment.childNodes).forEach((node) => {
      let textContent = node.textContent;
      let reg = /\{\{(.*?)}\}/g;

      if (node.nodeType === 3 && reg.test(textContent)) {
        const nodeTextContent = node.textContent;
        const replaceText = () => {
          node.textContent = nodeTextContent.replace(
            reg,
            (match, placeholder) => {
              return placeholder.split(".").reduce((prev, key) => {
                return prev[key];
              }, data);
            }
          );
        };

        replaceText();
      }

      if (node.childNodes && node.childNodes.length) {
        replace(node);
      }
    });
  }

  replace(fragment);

  el.appendChild(fragment);
  return el;
}

/**
 * 虚拟DOM
 * @param {*} node
 * @param {*} key
 * @param {*} value
 */

const setAttribute = (node, key, value) => {
  switch (key) {
    case "style":
      node.style.cssText = value;
      break;
    case "value":
      let tagName = node.tagName || "";
      tagName = tagName.toLowerCase();
      if (tagName === "input" || tagName === "textarea") {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
};

class Element {
  constructor(tagName, attributes = {}, children = {}) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
  }

  render() {
    let element = document.createElement(this.tagName);
    let attributes = this.attributes;

    for (let key in attributes) {
      setAttribute(element, key, attributes[key]);
    }

    let children = this.children;

    children.forEach((child) => {
      let childElement =
        child instanceof Element
          ? child.render()
          : document.createTextNode(child);
    });

    return element;
  }
}

function element(tagName, attributes, children) {
  return new Element(tagName, attributes, children);
}

const renderDom = (element, target) => {
  target.appendChild(element);
};

/**
 * 虚拟DOM diff
 * @param {*} oldVirtualDom
 * @param {*} newVirtualDom
 * @returns
 */

const diff = (oldVirtualDom, newVirtualDom) => {
  let patches = {};

  walkToDiff(oldVirtualDom, newVirtualDom, 0, patches);

  return patches;
};

let initialIndex = 0;

const walkToDiff = (oldVirtualDom, newVirtualDom, index, patches) => {
  let diffResult = [];

  if (!newVirtualDom) {
    diffResult.push({
      type: "REMOVE",
      index,
    });
  } else if (
    typeof oldVirtualDom === "string" &&
    typeof newVirtualDom === "string" // 文本元素变化
  ) {
    if (oldVirtualDom !== newVirtualDom) {
      diffResult.push({
        type: "MODIFY_TEXT",
        data: newVirtualDom,
        index,
      });
    }
  } else if (oldVirtualDom.tagName === newVirtualDom.tagName) {
    // 仅元素属性变化

    let diffAttributeResult = {};

    // 对比新旧元素所不同的属性
    for (let key in oldVirtualDom) {
      if (oldVirtualDom[key] !== newVirtualDom[key]) {
        diffAttributeResult[key] = newVirtualDom[key];
      }
    }

    for (let key in newVirtualDom) {
      if (!oldVirtualDom.hasOwnProperty(key)) {
        diffAttributeResult[key] = newVirtualDom[key];
      }
    }

    // 保存新旧元素存在的不同点
    if (Object.keys(diffAttributeResult).length > 0) {
      diffResult.push({
        type: "MODIFY_ATTRIBUTES",
        diffAttributeResult,
      });
    }

    // 继续遍历子元素
    oldVirtualDom.children.forEach((child, index) => {
      walkToDiff(child, newVirtualDom.children[index], ++initialIndex, patches);
    });
  } else {
    diffResult.push({
      type: "REPLACE",
      newVirtualDom,
    });
  }

  if (!oldVirtualDom) {
    diffResult.push({
      type: "REPLACE",
      newVirtualDom,
    });
  }

  if (diffResult.length) {
    patches[index] = diffResult;
  }
};

const patch = (node, patches) => {
  let walker = { index: 0 };

  walk(node, walker, patches);
};

/**
 * 执行diff出的结果
 * @param {*} node     元素
 * @param {*} walker   执行器
 * @param {*} patches  diff结果
 */
const walk = (node, walker, patches) => {
  let currentPath = patches(walker.index);

  let childNodes = node.childNodes;

  childNodes.forEach((child) => {
    walker.index++;
    walk(child, walker, patches);
  });

  if (currentPath) {
    doPatch(node, currentPath);
  }
};

/**
 * 执行器
 * @param {*} node       元素
 * @param {*} patches    diff结果
 */
const doPatch = (node, patches) => {
  patches.forEach((patch) => {
    switch (patch.type) {
      case "MODIFY_ATTRIBUTES":
        const attributes = patch.diffAttributeResult.attributes;

        for (let key in attributes) {
          if (node.nodeType !== 1) return;

          const value = attributes[key];
          if (value) {
            setAttribute(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case "MODIFY_TEXT":
        node.textContent = patch.data;
        break;
      case "REPLACE":
        let newNode =
          patch.newNode instanceof Element
            ? render(patch.newNode)
            : document.createTextNode(patch.newNode);

        node.parenNode.replaceChild(newNode, node);
        break;
      case "REMOVE":
        node.parenNode.removeChild(node);
        break;
      default:
        break;
    }
  });
};
