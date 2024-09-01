function sayHi() {
    console.log(name)
    console.log(age)

    var name = 'Lydia'
    let age = 21
}
sayHi()

const shape = {
    radius: 10,
    diameter() {
        return this.radius * 2
    },
    perimeter: () => 2 * Math.PI * this.radius
}

console.log(shape.diameter())
console.log(shape.perimeter())

function Person(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
}

const lydia = new Person('Lydia', 'Hallie')
const sarah = Person('Sarah', 'Smith')
console.log(lydia)
console.log(sarah)

const value = { number: 10 }

const multiply = (x = { ...value }) => {
    console.log((x.number *= 2))
}

multiply()
multiply()
multiply(value)
multiply(value)

const myPromise = Promise.resolve(Promise.resolve('My Promise!!!'))

function funOne() {
    myPromise.then(res => res).then(res => console.log(res))
    setTimeout(() => console.log('Timeout'), 0)
    console.log('Last line')
}
async function funcTwo() {
    const res = await myPromise
    console.log(await res)
    setTimeout(() => console.log('timeout'), 0)
    console.log('last line!')
}

funOne()
funcTwo()


function MaxSubsequence(array) {
    let tempMax = array[0],
        max = array[0]

    for (let i = 1; i < array.length; i++) {
        max = Math.max(max + array[i], array[i])
        if (max > tempMax) {
            tempMax = max
        }
    }

    console.log(tempMax)
    return tempMax
}

MaxSubsequence([2, 4, -7, 5, 2, -1, 2, -4, 3])

var a = 1

function fn() {
    console.log(a)
    var a = 5
    console.log(a)
    a++
    var a
    fn3()
    fn2()
    console.log(a)

    function fn2() {
        console.log(a)
        a = 20
    }
}

function fn3() {
    console.log(a)
    a = 200
}

fn()
console.log(a)
