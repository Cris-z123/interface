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

const TwoDimensionalArray = [
  [1, 1],
  [2, 2],
];

TwoDimensionalArray.reduce((acc, cur) => {
  return acc.concat(cur);
}, []);
