/**
 * Title: Longest Substring Without Repeating Characters
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * ID: 0003
 * Created: Sat Jan 29 2022
 */

/**
Example Cases: 

"abcabcbb"
"bbbbb"
"pwwkew"

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/**
Instead off looping through stack to remove elements, slice the array to save iterating
Runtime: 156 ms, faster than 57.64% of TypeScript online submissions for Longest Substring Without Repeating Characters.
Memory Usage: 48 MB, less than 12.06% of TypeScript online submissions for Longest Substring Without Repeating Characters.
 */
function lengthOfLongestSubstring(s: string): number {
  const lengths = new Set<number>([0])
  const stack: string[] = []
  for (const char of [...s]) {
    if (stack.includes(char)) {
      stack.splice(0, stack.indexOf(char) + 1)
    }
    stack.push(char)
    lengths.add(stack.length)
  }
  return Math.max(...lengths.values())
}

/** Main Code Snippet */
/**
Runtime: 185 ms, faster than 47.69% of TypeScript online submissions for Longest Substring Without Repeating Characters.
Memory Usage: 45.6 MB, less than 39.24% of TypeScript online submissions for Longest Substring Without Repeating
 */
function lengthOfLongestSubstringOrig(s: string): number {
  let max = 0
  const stack: string[] = []
  for (const char of [...s]) {
    if (stack.includes(char)) {
      let removed
      do {
        removed = stack.shift()
      } while (removed != char)
    }
    stack.push(char)
    max = Math.max(max, stack.length)
  }
  return max
}

const examples = [' ', 'abcabcbb', 'bbbbb', 'pwwkew', 'dvdf']

run(examples, lengthOfLongestSubstring)
