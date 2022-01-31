/**
 * Title: Richest Customer Wealth
 * Category: Algorithms
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/richest-customer-wealth/
 * ID: 1672
 * Created: Sun Jan 30 2022
 */

/**
Example Cases: 

[[1,2,3],[3,2,1]]
[[1,5],[7,3],[3,5]]
[[2,8,7],[7,1,3],[1,9,5]]

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */
function maximumWealth(accounts: number[][]): number {
  let max = 0
  for (const account of accounts) {
    max = Math.max(
      max,
      account.reduce((prev, cur) => prev + cur)
    )
  }
  return max
}

const examples = [
  [
    [1, 2, 3],
    [3, 2, 1],
  ],
  [
    [1, 5],
    [7, 3],
    [3, 5],
  ],
  [
    [2, 8, 7],
    [7, 1, 3],
    [1, 9, 5],
  ],
]

run(examples, maximumWealth)
