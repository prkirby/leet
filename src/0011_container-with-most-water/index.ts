/**
 * Title: Container With Most Water
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/container-with-most-water/
 * ID: 0011
 * Created: Mon Jan 10 2022
 */

/**
Example Cases: 

[1,8,6,2,5,4,8,3,7]
[1,1]

*/

import run from '../utils'
// import { } from '../utils/print-functions'

const exampleCases = [
  [1, 8, 6, 2, 5, 4, 8, 3, 7],
  [1, 1],
  [1, 3, 2, 5, 25, 24, 5],
]

/** Main Code Snippet */
/**
 * Cleaned up, and more clearly using two pointer solution than pop and shifting
 * Better than 28%
 * 148ms, 48mb
 * Seems to be the best option
 */
function maxArea(height: number[]): number {
  let left = 0
  let right = height.length - 1
  let result = 0

  while (left < right) {
    result = Math.max(
      result,
      Math.min(height[left], height[right]) * (right - left)
    )

    if (height[left] < height[right]) left++
    else right--
  }

  return result
}

function getArea(height: number[]) {
  return Math.min(height[0], height[height.length - 1]) * (height.length - 1)
}

/**
 * Only better than ~ 5%. Huge memory usage, has to check every possibility, no look ahead
 * 456 ms | 56.9 MB
 */
function maxAreaRecursive(height: number[]): number {
  if (height.length <= 2) {
    return getArea(height)
  }

  const curArea = getArea(height)

  if (height[0] < height[height.length - 1]) {
    height.shift()
  } else {
    height.pop()
  }

  return Math.max(curArea, maxArea(height))
}

/**
 * No better than the recursive function in terms of speed.
 */
function maxAreaLinear(height: number[]): number {
  let sorted = [...height].sort((a, b) => b - a)
  let maxArea = getArea(height)
  let curArea = maxArea
  let left = height[0]
  let right = height[height.length - 1]
  let shortest = Math.min(left, right)

  while (height.length > 2 && shortest < sorted[1]) {
    if (left < right) {
      height.shift()
    } else {
      height.pop()
    }

    curArea = getArea(height)
    maxArea = maxArea > curArea ? maxArea : curArea
    left = height[0]
    right = height[height.length - 1]
    shortest = Math.min(left, right)
  }

  return maxArea
}

function printWrapper(height: number[]) {
  console.log('Input: ', height)
  const result = maxArea(height)
  console.log('Output: ', result)
}

run(() => {
  /**
   * Write out to console here
   */

  for (const exampleCase of exampleCases) {
    printWrapper(exampleCase)
  }
})
