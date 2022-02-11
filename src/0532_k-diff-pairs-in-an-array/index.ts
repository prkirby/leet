/**
 * Title: K-diff Pairs in an Array
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/k-diff-pairs-in-an-array/
 * ID: 0532
 * Created: Wed Feb 09 2022
 */

/**
Example Cases: 

[3,1,4,1,5]
2
[1,2,3,4,5]
1
[1,3,1,5,4]
0

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */

function findPairs(nums: number[], k: number): number {
  if (nums.length < 2) return 0

  let count = 0

  // turn array into map of occurances of unique integers
  const map = new Map<number, number>()
  for (const num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num)! + 1)
    } else {
      map.set(num, 1)
    }
  }

  for (const [key, val] of map) {
    // If k = 0, we need to see how many times we have 2 or more identical integers
    if (k === 0) {
      if (val > 1) count++
    } else if (map.has(key + k)) count++
  }

  return count
}

const examples = [
  [[3, 1, 4, 1, 5], 2],
  [[1, 2, 3, 4, 5], 1],
  [[1, 3, 1, 5, 4], 0],
]

run(examples, findPairs)
