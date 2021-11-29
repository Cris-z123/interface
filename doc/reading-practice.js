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
