/**
 * Title: Integer to Roman
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/integer-to-roman/
 * ID: 0012
 * Created: Fri May 20 2022
 */

/**
Example Cases: 

3
58
1994

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */
function intToRoman(num: number): string {
  let roman = ''

  while (num >= 1000) {
    roman += 'M'
    num -= 1000
  }

  if (num >= 900) {
    roman += 'CM'
    num -= 900
  }

  if (num >= 500) {
    roman += 'D'
    num -= 500
  }

  if (num >= 400) {
    roman += 'CD'
    num -= 400
  }

  while (num >= 100) {
    roman += 'C'
    num -= 100
  }

  if (num >= 90) {
    roman += 'XC'
    num -= 90
  }

  if (num >= 50) {
    roman += 'L'
    num -= 50
  }

  if (num >= 40) {
    roman += 'XL'
    num -= 40
  }

  while (num >= 10) {
    roman += 'X'
    num -= 10
  }

  if (num == 9) {
    roman += 'IX'
    num -= 9
  }

  if (num >= 5) {
    roman += 'V'
    num -= 5
  }

  if (num == 4) {
    roman += 'IV'
    num -= 4
  }

  while (num > 0) {
    roman += 'I'
    num--
  }

  return roman
}

const examples = [3, 58, 1994, 1996, 400]

run(examples, intToRoman)
