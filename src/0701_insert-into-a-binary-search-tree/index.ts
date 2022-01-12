/**
 * Title: Insert into a Binary Search Tree
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/insert-into-a-binary-search-tree/
 * ID: 0701
 * Created: Tue Jan 11 2022
 */

/**
Example Cases: 

[4,2,7,1,3]
5
[40,20,60,10,30,50,70]
25
[4,2,7,1,3,null,null,null,null,null,null]
5

*/

import run from '../utils'
import { printBinaryTree } from '../utils/print-functions'
import { btArrayToLink, btLinkToArray } from '../utils/trees'

/** Main Code Snippet */

// Definition for a binary tree node.
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/**
 * Slick version I found in the answers
 */
function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) {
    return new TreeNode(val)
  }
  if (root.val > val) {
    root.left = insertIntoBST(root.left, val)
  } else {
    root.right = insertIntoBST(root.right, val)
  }
  return root
}

/**
Runtime: 221 ms, faster than 5.97% of TypeScript online submissions for Insert into a Binary Search Tree.
Memory Usage: 50.6 MB, less than 14.93% of TypeScript online submissions for Insert into a Binary Search Tree.
 */
function insertIntoBSTInitial(
  root: TreeNode | null,
  val: number
): TreeNode | null {
  if (!root) return new TreeNode(val)

  helper(root, val)

  return root
}

function helper(node: TreeNode, val: number): void {
  if (node.val === val) return

  const direction = val > node.val ? 'right' : 'left'
  let nextNode = node[direction]

  if (!nextNode) {
    node[direction] = new TreeNode(val)
  }

  return helper(node[direction]!, val)
}

const examples = [
  {
    array: [4, 2, 7, 1, 3],
    val: 5,
  },
  {
    array: [40, 20, 60, 10, 30, 50, 70],
    val: 25,
  },
  {
    array: [4, 2, 7, 1, 3, null, null, null, null, null, null],
    val: 5,
  },
  {
    array: [],
    val: 5,
  },
]

run(() => {
  /**
   * Write out to console here
   */
  for (const example of examples) {
    console.log(example, '\n')
    const tree = btArrayToLink(example.array)
    insertIntoBST(tree, example.val)
    printBinaryTree(tree)
  }
})
