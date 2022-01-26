/**
 * Title: All Elements in Two Binary Search Trees
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/all-elements-in-two-binary-search-trees/
 * ID: 1305
 * Created: Tue Jan 25 2022
 */

/**
Example Cases: 

[2,1,4]
[1,0,3]
[1,null,8]
[8,1]

*/

/**
Constraints:

The number of nodes in each tree is in the range [0, 5000].
-105 <= Node.val <= 105
 */

import run from '../utils'
import { TreeNode, btArrayToLink } from '../utils/trees'
import { printBinaryTree } from '../utils/print-functions'

/** Main Code Snippet */
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
Runtime: 329 ms, faster than 26.32% of TypeScript online submissions for All Elements in Two Binary Search Trees.
Memory Usage: 57 MB, less than 36.84% of TypeScript online submissions for All Elements in Two Binary Search Trees.
 */
function getAllElements(
  root1: TreeNode | null,
  root2: TreeNode | null
): number[] {
  let list: number[] = []

  function traverseTree(root: TreeNode | null) {
    if (!root) return
    if (root.left) {
      traverseTree(root.left)
    }
    if (root.right) {
      traverseTree(root.right)
    }
    if (root.val !== null) list.push(root.val)
  }

  traverseTree(root1)
  traverseTree(root2)

  return list.sort((a, b) => a - b)
}

function printWrapper(
  example: [Array<number | null>, Array<number | null>]
): number[] {
  const tree1 = btArrayToLink(example[0])
  const tree2 = btArrayToLink(example[1])
  printBinaryTree(tree1)
  printBinaryTree(tree2)
  return getAllElements(tree1, tree2)
}

const examples: [Array<number | null>, Array<number | null>][] = [
  [
    [2, 1, 4],
    [1, 0, 3],
  ],
  [
    [1, null, 8],
    [8, 1],
  ],
]

run(examples, printWrapper)
