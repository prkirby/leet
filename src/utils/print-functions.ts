import { BTreeNode, btLinkToArray } from './trees'
import { Graph, Vertex, Edge } from './graphs'

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

export function printGraph<K, V>(graph: Graph<K, V>) {
  for (const [key, edges] of graph.adjList.entries()) {
    let adjString = '['
    for (const edge of edges) {
      adjString += `\n        { id: ${edge.orig.id} | v: ${edge.orig.data}, id: ${edge.dest.id} | v: ${edge.dest.data} }`
    }
    adjString += '\n      ]'
    console.log(`${key} --> ${adjString}\n`)
  }
}
