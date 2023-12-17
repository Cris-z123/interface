function randomRange(myMax, myMin) {
  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin
}

function randomInteger(num) {
  return Math.floor(Math.random() * num)
}

// 字符串拼接的空格 "\xa0"

//map() reduce() filter()

pop()
shift()
push()
unshift()
slice()
splice()
indexOf()
map()
// 以任意顺序遍历一个对象的除Symbol以外的可枚举属性。
for (const key in object) {
  if (object.hasOwnProperty(key)) {
    const element = object[key];

  }
};
for (const iterator of object) {

};
array.forEach(element => {

});

let arr = [...rest]
//delete 用来删除对象的属性
//一般都是用.语法来访问对象的属性，访问的属性为变量时，使用[]语法

Object.keys()

hasOwnProperty()
prototype.isPrototypeOf()


function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function () {
    console.log("nom nom nom");
  }
};


// Inherit Behaviors from a Supertype
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function () {
    console.log("nom nom nom");
  }
};

let duck = Object.create(Animal.prototype);
let beagle = Object.create(Animal.prototype);


//Set the Child's Prototype to an Instance of the ParentPassed
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function () {
    console.log("nom nom nom");
  }
};

function Dog() { }

Dog.prototype = Object.create(Animal.prototype)

let beagle2 = new Dog();


//Reset an Inherited Constructor Property
function Animal() { }
function Bird() { }
function Dog() { }

Bird.prototype = Object.create(Animal.prototype);
Dog.prototype = Object.create(Animal.prototype);

Bird.prototype.constructor = Bird
Dog.prototype.constructor = Dog

let duck2 = new Bird();
let beagle3 = new Dog();


//Add Methods After InheritancePassed
function Animal() { }
Animal.prototype.eat = function () { console.log("nom nom nom"); };

function Dog() { }
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog
Dog.prototype.bark = function () {
  console.log("Woof!")
}

let beagle4 = new Dog();


//Override Inherited Methods
function Bird() { }
Bird.prototype.fly = function () { return "I am flying!"; };

function Penguin() { }
Penguin.prototype = Object.create(Bird.prototype);
Penguin.prototype.constructor = Penguin;
Penguin.prototype.fly = function () {
  return "Alas, this is a flightless bird."
}

let penguin = new Penguin();
console.log(penguin.fly());



// Use a Mixin to Add Common Behavior Between Unrelated Objects
let bird = {
  name: "Donald",
  numLegs: 2
};

let boat = {
  name: "Warrior",
  type: "race-boat"
};


let glideMixin = function (obj) {
  obj.glide = function () {
    console.log("Flying, wooosh!")
  }
}
glideMixin(bird)
glideMixin(boat)


//Use Closure to Protect Properties Within an Object from Being Modified Externally
function Bird() {
  let weight = 15;
  this.getWeight = function () {
    return weight
  }
}

let redBird = new Bird
redBird.getWeight()


  //Understand the Immediately Invoked Function Expression (IIFE)
  (function () {
    console.log("A cozy nest is ready");
  })()


//Use an IIFE to Create a Module
let funModule = (function () {
  return {
    isCuteMixin: function (obj) {
      obj.isCute = function () {
        return true;
      };
    },
    singMixin: function (obj) {
      obj.sing = function () {
        console.log("Singing to an awesome tune");
      };
    }
  }
})()

let duck3 = {}

funModule.singMixin(duck3)
duck3.sing()
