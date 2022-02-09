/**
 * Title: Find the Difference
 * Category: Algorithms
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/find-the-difference/
 * ID: 0389
 * Created: Mon Feb 07 2022
 */

/**
Example Cases: 

"abcd"
"abcde"
""
"y"

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */
function findTheDifference(s: string, t: string): string {
  if (!s) return t
  const sArr = [...s]
  const tArr = [...t]
  let char: string
  let i: number
  while (s.length) {
    char = tArr.pop()!
    i = sArr.findIndex((val) => char === val)
    if (i >= 0) {
      sArr.splice(i, 1)
    } else {
      return char
    }
  }
  return tArr[0]
}

function wrapper(input: [string, string]): string {
  return findTheDifference(input[0], input[1])
}

const examples = [
  ['abcd', 'abcde'],
  ['', 'y'],
  ['aaaaaaaaaa', 'aaaaaacaaaa'],
  ['aaaaaaaaaa', 'aaaaaaaaaaa'],
]

run(examples, wrapper)
