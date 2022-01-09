interface ListNode {
  val: any
  next: ListNode
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
