export type TreeNode = {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

export function btArrayToLink(array: Array<number | null>): TreeNode {
  const root: TreeNode = {
    val: array[0]!,
    left: null,
    right: null,
  }

  function btArrayToLinkHelper(index: number, node: TreeNode): TreeNode {
    const left = index * 2 + 1
    const right = index * 2 + 2
    if (left < array.length && array[left] !== null) {
      node.left = btArrayToLinkHelper(left, {
        val: array[left]!,
        left: null,
        right: null,
      })
    }

    if (right < array.length && array[right] !== null) {
      node.right = btArrayToLinkHelper(right, {
        val: array[right]!,
        left: null,
        right: null,
      })
    }

    return node
  }

  return btArrayToLinkHelper(0, root)
}

export function btLinkToArray(root: TreeNode): Array<number> {
  const returnArray: number[] = []
  btLinkToArrayHelper(0, root, returnArray)
  return returnArray
}

function btLinkToArrayHelper(
  index: number,
  curNode: TreeNode,
  nodeArray: Array<number>
) {
  nodeArray[index] = curNode.val
  if (curNode.left) btLinkToArrayHelper(index * 2 + 1, curNode.left, nodeArray)
  if (curNode.right)
    btLinkToArrayHelper(index * 2 + 2, curNode.right, nodeArray)
}
