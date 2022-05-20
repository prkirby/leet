/**
 * Title: Roman to Integer
 * Category: Algorithms
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/roman-to-integer/
 * ID: 0013
 * Created: Fri May 20 2022
 */

/**
Example Cases: 

"III"
"LVIII"
"MCMXCIV"

*/

import run from '../utils'
// import { } from '../utils/print-functions'

// I 1 V 5 X 10 L 50 C 100 D 500 M 1000
const map = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
])

/** Main Code Snippet */
function romanToInt(s: string): number {
  const arr = s.split('')
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    let val = map.get(arr[i])!
    if (i < arr.length - 1 && val < map.get(arr[i + 1])!) {
      val = map.get(arr[++i])! - val
    }
    count += val
  }
  return count
}

//'III', 'LVIII',
const examples = ['MCMXCIV']

run(examples, romanToInt)
