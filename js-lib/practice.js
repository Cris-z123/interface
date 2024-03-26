/**
 * RGB转化为16进制
 * @param {Number} r 
 * @param {Number} g 
 * @param {Number} b 
 * @returns 
 */
function toRGB(r, g, b) {
    function toHex(a) {
        if (a < 0) {
            a = "00"
        } else if (0 < r < 16) {
            a = "0" + r.toString(16)
        } else if (16 < r < 255) {
            a = r.toString(16)
        } else {
            a = "ff"
        }
        return a.toUpperCase()
    }
    return toHex(r) + toHex(g) + toHex(b)
}


function likes(names) {
    leg = names.length
    other = leg - 2
    switch (leg) {
        case 0:
            console.log("no one likes this")
            break
        case 1:
            console.log(`${names[0]} likes this`)
            break
        case 2:
            console.log(`${names[0]} and ${names[1]} likes this`)
            break
        case 3:
            console.log(`${names[0]}, ${names[1]} and ${names[2]} likes this`)
            break
        default:
            console.log(`${names[0]}, ${names[1]} and ${other}  others likes this`)
    }
}

function moveZeros(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            arr.splice(arr[i], 1).push(0)
        }
    }
    return arr
}

/**
 * chunk([1, 2, 3, 4], 2) => [[1, 2], [3, 4]]
 * @param {*} array 
 * @param {*} size 
 * @returns 
 */
function chunk(array, size) {
    const result = []
    let index = 0
    while (index < Array.length) {
        result.push(array.slice(index, index + size))
        index += size
    }
    return result
}

/**
 * 二叉树的前序遍历
 * @param {*} val
 * @param {*} left
 * @param {*} right
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : val)
    this.right = (right === undefined ? null : right)
}

function preorderTraversal(root) {
    const res = []
    if (root === null) {
        return res
    }
    const order = (node) => {
        res.push(node.val)
        if (node.left !== null) {
            order(node.left)
        }
        if (node.right !== null) {
            order(node.right)
        }
    }
    order(root)
    return res
}