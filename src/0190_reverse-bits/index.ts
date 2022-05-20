/**
 * Title: Reverse Bits
 * Category: Algorithms
 * Difficulty: Easy
 * URL: https://leetcode.com/problems/reverse-bits/
 * ID: 0190
 * Created: Thu May 19 2022
 */

/**
Example Cases: 

00000010100101000001111010011100
11111111111111111111111111111101

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */
function reverseBits(n: number): number {
  let bitString = ''
  for (let i = 31; i >= 0; i--) {
    bitString += n & 1
    n = n >> 1
  }

  console.log(bitString)
  return parseInt(bitString, 2)
}

function runCode(example: string): number {
  console.log(example)
  console.log(parseInt(example, 2))
  return reverseBits(parseInt(example, 2))
}

const examples = [
  '00000010100101000001111010011100',
  '11111111111111111111111111111101',
]

// NAIEVE AS HELL FOOL
// function reverseBits(n: number): number {
//   return parseInt(
//     n.toString(2).padStart(32, '0').split('').reverse().join(''),
//     2
//   )
// }

run(examples, runCode)
