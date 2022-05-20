/**
 * Title: Palindrome Number
 * Category: Algorithms
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/palindrome-number/
 * ID: 0009
 * Created: Fri May 20 2022
 */

/**
Example Cases: 

121
-121
10

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */
function isPalindrome(x: number): boolean {
  if (x < 0) return false
  const arr = x.toString().split('')

  for (let i = 0, j = arr.length - 1; i <= j; i++, j--) {
    if (arr[i] !== arr[j]) return false
  }

  return true
}

const examples = [121, -121, 10, 456654, 1111111111111]

run(examples, isPalindrome)
