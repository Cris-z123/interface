let min = (numbers) => {
    if(numbers.length > 2){
        return min([numbers[0], min(numbers.slice(1))])
    } else {
        return Math.min.apply(null, numbers)
    }
}

let minIndex = (numbers) => numbers.indexOf(min(numbers))

let sort = (numbers) => {
    if(numbers.length > 2){
        let index = minIndex(numbers)
        let min = numbers[index]
        numbers.splice(index, 1)
        return [min].concat(sort(numbers))
    } else {
        return numbers[0]<numbers[1] ? numbers : numbers.reverse()
    }
}


console.log(min([8,7,5,1,3,2]))
console.log(minIndex([8,7,5,1,3,2]))
console.log(sort([2,5,8,3,4]))




//选择排序
let sort = (numbers) => {
    for(let i = 0; i<numbers.length-1; i++){
        console.log(`----`)
        console.log(`i:${i}`)
        let index = minIndex(numbers.slice(i))+i
        console.log(`index:${index}`)
        console.log(`min:${numbers[index]}`)
        if(index!==i){
            swap(numbers, index, i)
            console.log(`swap${index}:${i}`)
            console.log(numbers)
        }
    }
    return numbers
}

let swap = (array, i, j) =>{
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

let minIndex = (numbers) => {
    let index = 0
    for(let i = 0; i<numbers.length; i++){
        if(numbers[i] < numbers[index]){
            index = i
        }
    }
    return index
}


//快速排序
let quickSort = arr => {
    if(arr.length <= 1){ return arr }
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++){
        if(arr[i] < pivot){
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}


//归并排序
let mergeSort = arr => {
    let k = arr.length
    if(k === 1){return arr}
    let left = arr.slice(0, Math.floor(k / 2))
    let right = arr.slice(Math.floor(k / 2))
    return merge(mergeSort(left), mergeSort(right))
}
let merge = (a, b) => {
    if(a.length === 0) return b
    if(b.length === 0) return a
    return a[0] > b[0] ? [b[0].concat(merge(a, b.slice(1)))] : [a[0].concat(a.slice(1), b)]
}


//计数排序
let countSort = arr => {
    let hashTable = {}
    let max = 0
    let result = []
    for(let i = 0; i < arr.length; i++) {
        if(!(arr[i] in hashTable)) {
            hashTable[arr[i]] = 1
        } else {
            hashTable[arr[i]] += 1
        }
        if(arr[i] > max){max = arr[i]}
    }
    for(let j = 0; j < max; j++){
        if (j in hashTable) {
            for(let i = 0; i < hashTable[j]; i++) {
                result.push(j)
            }
        }
    }
    return result
}



const arr = [1, 4, 2, 5, 7, 3, 6, 10, 9, 8, 11]

/**
 * 冒泡排序
 */
function bubbleSort(arr) {
    for(let i=0; i<arr.length - 1; i++) {
        for(let j=0; j<arr.length - 1; j++) {
            if(arr[j] > arr[j+1]) {
                let temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr
}


/**
 * 选择排序
 */
function selectionSort(arr) {
    let minIndex, temp
    for(let i=0; i<arr.length -1; i++) {
        minIndex = i;
        for(let j=i+1; j<arr.length; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr
}

