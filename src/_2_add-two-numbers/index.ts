/**
 * Title: Add Two Numbers
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/add-two-numbers/
 * ID: 2
 * Created: Sun Jan 09 2022
 */

import run from '../utils'
import { printList } from '../utils/print-functions'

/** Main Code Snippet */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  return adderHelper(l1, l2, false)
}

function adderHelper(
  l1: ListNode | null,
  l2: ListNode | null,
  carry: boolean
): ListNode | null {
  if (!l1 && !l2 && !carry) return null

  const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + (carry ? 1 : 0)

  return new ListNode(
    sum % 10,
    adderHelper(l1 && l1.next, l2 && l2.next, sum > 9)
  )
}

/**
 * Write out to console here
 */
function output(): void {
  const listPair: number[][] = [
    [2, 4, 3],
    [5, 6, 4],
  ]

  const listArray: [ListNode | null, ListNode | null] = [null, null]
  for (let i = 0; i < 2; i++) {
    let tmpNode,
      curNode,
      firstNode: ListNode | null = null
    for (const val of listPair[i]) {
      curNode = new ListNode(val)
      if (tmpNode) {
        tmpNode.next = curNode
      } else {
        firstNode = curNode
      }
      tmpNode = curNode
    }
    listArray[i] = firstNode
  }
  printList(listArray[0])
  printList(listArray[1])
  printList(addTwoNumbers(listArray[0], listArray[1]))
}

run(() => {
  /**
   * Write out to console here
   */
  output()
})
