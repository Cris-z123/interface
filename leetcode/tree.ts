interface ITreeNode {
    value: number
    left: ITreeNode | null
    right: ITreeNode | null
}

const treeArr: number[] = []


/**
 * 前序遍历
 * @param node 
 * @returns 
 */
function preOrderTraverse(node: ITreeNode | null): void {
    if (node == null) return
    console.info(node.value)
    treeArr.push(node.value)
    preOrderTraverse(node.left)
    preOrderTraverse(node.right)
}

/**
 * 中序遍历
 * @param node 
 * @returns 
 */
function inOrderTraverse(node: ITreeNode | null): void {
    if (node == null) return
    inOrderTraverse(node.left)
    console.info(node.value)
    treeArr.push(node.value)
    inOrderTraverse(node.right)
}
