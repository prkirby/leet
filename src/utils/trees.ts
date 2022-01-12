export type BTreeNode = {
  val: number
  left: BTreeNode | null
  right: BTreeNode | null
}

export function btArrayToLink(array: Array<number | null>): BTreeNode {
  const root: BTreeNode = {
    val: array[0]!,
    left: null,
    right: null,
  }

  function btArrayToLinkHelper(index: number, node: BTreeNode): BTreeNode {
    const left = index * 2 + 1
    const right = index * 2 + 2
    if (array[left]) {
      node.left = btArrayToLinkHelper(left, {
        val: array[left]!,
        left: null,
        right: null,
      })
    }

    if (array[right]) {
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

export function btLinkToArray(root: BTreeNode): Array<number> {
  const returnArray: number[] = []
  btLinkToArrayHelper(0, root, returnArray)
  return returnArray
}

function btLinkToArrayHelper(
  index: number,
  curNode: BTreeNode,
  nodeArray: Array<number>
) {
  nodeArray[index] = curNode.val
  if (curNode.left) btLinkToArrayHelper(index * 2 + 1, curNode.left, nodeArray)
  if (curNode.right)
    btLinkToArrayHelper(index * 2 + 2, curNode.right, nodeArray)
}
