/**
 * Title: String to Integer (atoi)
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/string-to-integer-atoi/
 * ID: 0008
 * Created: Thu Jan 13 2022
 */

/**
Example Cases: 

"42"
"   -42"
"4193 with words"

*/

import { stringify } from 'querystring'
import run from '../utils'
// import { } from '../utils/print-functions'

/**
Runtime: 177 ms, faster than 13.55% of TypeScript online submissions for String to Integer (atoi).
Memory Usage: 39.9 MB, less than 98.80% of TypeScript online submissions for String to Integer (atoi).
 */
/** Main Code Snippet */
function myAtoi(s: string): number {
  let number = 0
  s = s.trimLeft()

  if (!s.length) return number
  let sign = 1

  if (/[\+, -]{1}/.test(s[0])) {
    sign = s[0] === '-' ? -1 : 1
    s = s.slice(1)
    if (!s.length) return number
  }

  let matches = s.match(/^\d+/)

  if (!matches) return number
  number = Number.parseInt(matches[0])
  if (number > Math.pow(2, 31) - 1) {
    number = Math.pow(2, 31)
    if (sign > 0) number--
  }

  return number * sign
}

const examples = ['42', '   -42', '4193 with words']

run(() => {
  for (const example of examples) {
    console.log(example)
    console.log(myAtoi(example))
    console.log('\n\n')
  }
})
