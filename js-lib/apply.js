/**
 * apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
 * @param {*绑定值} context
 * @param {*参数} args
 */
Function.prototype.myApply1 = function (context, args) {
  context = context || window;
  args = args ? args : [];
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myApply2 = function (targetObject, argsArray) {
  if (typeof argsArray === "undefined" || argsArray === null) {
    argsArray = [];
  }

  if (typeof targetObject === "undefined" || targetObject === null) {
    targetObject = window;
  }

  targetObject = new Object(targetObject);

  const targetFnKey = "targetFnKey";
  targetObject[targetFnKey] = this;

  const result = targetObject[targetFnKey](...argsArray);
  delete targetObject[targetFnKey];
  return result;
};
