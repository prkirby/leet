/**
 * Title: Valid Mountain Array
 * Category: Algorithms
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/valid-mountain-array/
 * ID: 0941
 * Created: Tue Jan 25 2022
 */

/**
Example Cases: 

[2,1]
[3,5,5]
[0,3,2,1]

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */
/**
 * Runtime: 76 ms, faster than 93.38% of TypeScript online submissions for Valid Mountain Array.
 * Memory Usage: 46.1 MB, less than 5.30% of TypeScript online submissions for Valid Mountain Array.
 */
function validMountainArray(arr: number[]): boolean {
  if (arr.length < 3) return false
  let hikingUp = true
  let currentHeight = arr.shift() as number
  for (const [i, nextHeight] of arr.entries()) {
    if (
      currentHeight === nextHeight ||
      (!hikingUp && nextHeight > currentHeight)
    )
      return false
    if (hikingUp) {
      if (nextHeight < currentHeight) {
        if (i === 0) return false
        hikingUp = false
      }
    }
    currentHeight = nextHeight
  }
  if (hikingUp) return false
  return true
}

const examples = [
  [2, 8, 1, 2],
  [3, 5, 5],
  [0, 3, 2, 1],
]

run(examples, validMountainArray)
