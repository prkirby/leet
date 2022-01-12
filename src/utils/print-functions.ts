import { BTreeNode, btLinkToArray } from './trees'

type ListNode = {
  val: any
  next: ListNode | null
}

export function printList(list: ListNode | null) {
  if (!list) return
  let str = `[${list.val}`
  while (list.next) {
    list = list.next
    str += `, ${list.val}`
  }
  console.log(str + ']')
}

export function printBinaryTree(root: BTreeNode) {
  const nodeArray = btLinkToArray(root)
  console.log(nodeArray)
}
