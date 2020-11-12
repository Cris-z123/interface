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
  eat: function() {
    console.log("nom nom nom");
  }
};


// Inherit Behaviors from a Supertype
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

let duck = Object.create(Animal.prototype); 
let beagle = Object.create(Animal.prototype);


//Set the Child's Prototype to an Instance of the ParentPassed
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Dog() { }

Dog.prototype = Object.create(Animal.prototype)

let beagle = new Dog();


//Reset an Inherited Constructor Property
function Animal() { }
function Bird() { }
function Dog() { }

Bird.prototype = Object.create(Animal.prototype);
Dog.prototype = Object.create(Animal.prototype);

Bird.prototype.constructor = Bird
Dog.prototype.constructor = Dog

let duck = new Bird();
let beagle = new Dog();

