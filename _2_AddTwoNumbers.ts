/**
 * Title: Add Two Numbers
 * Created: 01/07/2022
 * URL: https://leetcode.com/problems/add-two-numbers/
 */

// ======================
// Description
// ======================

// You are given two non-empty linked lists representing two non-negative integers.
// The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example 1:

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

import run from './utils'
import { printList } from './utils/print-functions'

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
  const listPair = [
    [2, 4, 3],
    [5, 6, 4],
  ]

  const listArray: [ListNode | null, ListNode | null] = [null, null]
  for (const [index, list] of listPair.entries()) {
    let tmpNode,
      curNode,
      firstNode: ListNode | null = null
    for (const val of list) {
      curNode = new ListNode(val)
      if (tmpNode) {
        tmpNode.next = curNode
      } else {
        firstNode = curNode
      }
      tmpNode = curNode
    }
    listArray[index] = firstNode
  }
  printList(listArray[0])
  printList(listArray[1])
  printList(addTwoNumbers(listArray[0], listArray[1]))
}

;(() =>
  run(() => {
    output()
  }))()
