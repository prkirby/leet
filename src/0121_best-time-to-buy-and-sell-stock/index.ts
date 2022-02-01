/**
 * Title: Best Time to Buy and Sell Stock
 * Category: Algorithms
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * ID: 0121
 * Created: Mon Jan 31 2022
 */

/**
Example Cases: 

[7,1,5,3,6,4]
[7,6,4,3,1]

*/

import run from '../utils'
// import { } from '../utils/print-functions'
// https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane's_algorithm
/** Main Code Snippet */
function maxProfit(prices: number[]): number {
  let lowestPrice = Infinity
  let maxProfit = 0
  for (const price of prices) {
    const profit = price - lowestPrice
    maxProfit = Math.max(maxProfit, profit)
    lowestPrice = Math.min(lowestPrice, price)
  }
  return maxProfit
}

const ascendingBig = () => {
  const array = new Array(Math.pow(10, 5))
  for (let [i] of array.entries()) {
    console.log(i)
    array[i] = i
  }
  console.log(array)
  return array
}
const examples = [
  [7, 1, 5, 3, 6, 4],
  [7, 6, 4, 3, 1],
  [1],
  // new Array(Math.pow(10, 5)).fill(10),
  // ascendingBig(),
]

run(examples, maxProfit)
