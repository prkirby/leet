/**
 * Title: Permutation in String
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/permutation-in-string/
 * ID: 0567
 * Created: Fri Feb 11 2022
 */

/**
Example Cases: 

"ab"
"eidbaooo"
"ab"
"eidboaoo"

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */
// Sliding window check with two 'maps'
function checkInclusion(s1: string, s2: string): boolean {
  if (s2.length < s1.length) return false
  const s1Map = new Array<number>(26).fill(0)
  const s2Map = new Array<number>(26).fill(0)

  for (let i = 0; i < s1.length; i++) {
    s1Map[s1.charCodeAt(i) - 97]++ // 97 is char code for lowercase a
    s2Map[s2.charCodeAt(i) - 97]++
  }

  let left = 0
  let right = s1.length - 1

  while (right < s2.length) {
    if (matches(s1Map, s2Map)) return true
    s2Map[s2.charCodeAt(left) - 97]--
    left++
    right++
    s2Map[s2.charCodeAt(right) - 97]++
  }

  return false
}

function matches(arr1: number[], arr2: number[]): boolean {
  for (const [i, v] of arr1.entries()) {
    if (v != arr2[i]) return false
  }
  return true
}

const examples = [
  ['ab', 'eidbaooo'],
  ['ab', 'eidboaoo'],
]

run(examples, checkInclusion)
