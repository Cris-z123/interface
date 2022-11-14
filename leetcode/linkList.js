/**
 * 链表类
 * @param {*} val 
 */
function Node(val) {
    this.val = val
    this.next = null
}

function LinkList() {
    this.head = new Node('head')
    this.find = find
    this.insert = insert
    this.remove = remove
    this.findPrev = findPrev
    this.disPlay = disPlay
}

function find(item) {
    let currNode = this.head
    while(currNode.val !== item) {
        currNode = currNode.next
    }

    return currNode
}

function disPlay() {
    let currNode = this.head
    while(currNode.val !== null) {
        console.log(currNode.next.val)
        currNode = currNode.next
    }
}

/**
 * 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。
 * @param {*} head 
 * @param {*} k 
 */
function getKthFormEnd(head, k) {

}

/**
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 * @param {*} head 
 */
function reversePrint(head) {
    let result = []
    while(head !== null) {
        result.unshift(head.val)
        head = head.next
    }
    return result
}

function findPrev(item) {
    let currNode = this.head
    while(currNode.val !== null && currNode.next.val !== item) {
        currNode = currNode.next
    }
    return currNode
}

/**
 * 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
 * 返回删除后的链表的头节点。
 * @param {*} head 
 * @param {*} val 
 */
function deleteNode(item) {
    let prevNode = this.findPrev(item)
    if(prevNode.next !== null) {
        prevNode.next = prevNode.next.next
    }
}


/**
 * 输入一个链表的头节点，反转该链表并输出反转后链表的头节点
 * @param {*} head 
 * @returns 
 */
function reversList(head) {
    let first = head
    let last = null

    while(first !== null) {
        const next = first.next

        first.next = last
        last = first
        first = next
    }

    return last
}