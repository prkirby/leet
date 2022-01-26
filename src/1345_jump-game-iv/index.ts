/**
 * Title: Jump Game IV
 * Category: Algorithms
 * Difficulty: Hard
 * URL: https://leetcode.com/problems/jump-game-iv/
 * ID: 1345
 * Created: Fri Jan 14 2022
 */

/**
Example Cases: 

[100,-23,-23,404,100,23,23,23,3,404]
[7]
[7,6,9,6,9,6,9,7]

*/

import run from '../utils'
import { Graph, addEdge, bfsLinear } from '../utils/graphs'
import { printGraph } from '../utils/print-functions'
import {
  offBy2Error,
  superLong,
  superLong2,
  superLongAlternating,
} from './examples'

/**
 * Followed the example submission on this one.
 * Need to spend more time figuring out edge cases and potential
 * failure points next time I hit a difficult graph problem
 * Runtime: 362 ms, faster than 75.56% of TypeScript online submissions for Jump Game IV.
 * Memory Usage: 88.5 MB, less than 37.78% of TypeScript online submissions for Jump Game IV.
 */
function minJumps(arr: number[]): number {
  if (arr.length <= 1) return 0
  if (arr.length === 2) return 1

  // Map repeated values to their indices
  let valueToIndicesMap: Map<number, Set<number>> = new Map()
  arr.forEach((val, i) => {
    const idArray = valueToIndicesMap.get(val)
    if (idArray) {
      idArray.add(i)
    } else {
      valueToIndicesMap.set(val, new Set([i]))
    }
  })

  let curLayer = new Set<number>()
  curLayer.add(0) // Init current layer with index 0
  const visitedIndices = new Set<number>()
  visitedIndices.add(0)
  let layers = 0 // How many layers of our BFS have we gone
  let nextLayer: Set<number>

  while (curLayer.size > 0) {
    // while we still have a current layer

    nextLayer = new Set()

    // Iterate through the layer
    for (const node of curLayer) {
      // If we hit the end of the array, return our layer depth
      if (node === arr.length - 1) return layers

      // Add all same value indices to the nextLayer
      const indicesSet = valueToIndicesMap.get(arr[node])
      if (indicesSet) {
        for (const index of indicesSet.values()) {
          if (!visitedIndices.has(index)) {
            nextLayer.add(index)
            visitedIndices.add(index)
          }
        }
        // Remove that value, since all those indices have now been 'visited'
        valueToIndicesMap.delete(arr[node])
      }

      // Add the right and left nodes to next layer if applicable
      if (node + 1 < arr.length && !visitedIndices.has(node + 1)) {
        visitedIndices.add(node + 1)
        nextLayer.add(node + 1)
      }

      if (node > 0 && !visitedIndices.has(node - 1)) {
        visitedIndices.add(node - 1)
        nextLayer.add(node - 1)
      }
    }
    // swap curLayer with nextLayer and increment layer counter
    curLayer = nextLayer
    layers++
  }

  // Something went wrong
  return -1
}

const examples: number[][] = [
  // [100, -23, -23, 404, 100, 23, 23, 23, 3, 404],
  // [7, 8],
  // [7, 6, 9, 6, 9, 6, 9, 7],
  // [6, 1, 9],
  superLong,
  // superLong2,
  // superLongAlternating,
  // offBy2Error,
  // [
  //   25, -28, -51, 61, -74, -51, -30, 58, 36, 68, -80, -64, 25, -30, -53, 36,
  //   -74, 61, -100, -30, -52,
  // ],
]

function printWrapper(example: number[]) {
  return minJumps(example)
}

run(examples, printWrapper)

/**
 *  This is a failed effort to use a standardized graph without optimization
 *  When the super-long, repeating value arrays are provided, because of the O(n^2) complexity
 *  off building the graph, it timesout in leetcode. Given the nature of the problem
 *  a more direct approach is necessary.
 */
function arrayToGraphFailed(arr: number[]): Graph<number, number> {
  let graph = Graph<number, number>()
  let valueToIdsMap: Map<number, number[]> = new Map()

  arr.forEach((val, i) => {
    const idArray = valueToIdsMap.get(val)
    if (idArray) {
      idArray.push(i)
    } else {
      valueToIdsMap.set(val, [i])
    }
  })

  for (const [i, v] of arr.entries()) {
    const orig = { id: i, data: v }
    if (i > 0 && arr[i - 1] !== v) {
      graph = addEdge(graph, {
        orig,
        dest: { id: i - 1, data: arr[i - 1] },
      })
    }

    if (i < arr.length - 1 && arr[i + 1] !== v) {
      graph = addEdge(graph, {
        orig,
        dest: { id: i + 1, data: arr[i + 1] },
      })
    }

    const sameValueIndices = valueToIdsMap.get(v)

    if (sameValueIndices && sameValueIndices.length > 1) {
      for (let i = 0; i < sameValueIndices.length; i++) {
        for (let j = i + 1; j < sameValueIndices.length; j++) {
          graph = addEdge(graph, {
            orig: { id: sameValueIndices[i], data: v },
            dest: { id: sameValueIndices[j], data: v },
          })
        }
      }
      valueToIdsMap.delete(v)
    }
  }
  return graph
}

function minJumpsFailed(arr: number[]): number {
  const t0 = Date.now()
  const graph = arrayToGraphFailed(arr)
  const t1 = Date.now()
  console.log(`Graph building took ${t1 - t0}ms`)
  if (arr.length < 2) return 0
  if (arr.length === 2) return 1
  // return 0
  const start = 0
  const end = arr.length - 1
  const outGraph = bfsLinear(graph, start, end)
  const t2 = Date.now()
  console.log(`BFS Linear took ${t2 - t1}ms`)
  return outGraph.vertices.size - 1
}
