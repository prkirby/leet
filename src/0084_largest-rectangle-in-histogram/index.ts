/**
 * Title: Largest Rectangle in Histogram
 * Category: Algorithms
 * Difficulty: Hard
 * URL: https://leetcode.com/problems/largest-rectangle-in-histogram/
 * ID: 0084
 * Created: Fri Jan 28 2022
 */

/**
Example Cases: 

[2,1,5,6,2,3]
[2,4]

*/

import run from '../utils'
import { large1 } from './examples'
// import { } from '../utils/print-functions'

function printGrid(gridLength: number, gridHeight: number, heights: number[]) {
  let printGrid = ``
  for (let i = gridHeight - 1; i >= 0; i--) {
    let row = `| `
    for (let j = 0; j < gridLength; j++) {
      row += `${heights[j] > i ? 'x' : 'o'} | `
    }
    printGrid += `${row}\n`
  }
  console.log(printGrid)
}

// https://en.wikipedia.org/wiki/Monotone_priority_queue
function largestRectangleArea(heights: number[]): number {
  return 0
}

/**
Runtime: 9044 ms, faster than 5.41% of TypeScript online submissions for Largest Rectangle in Histogram.
Memory Usage: 52.2 MB, less than 67.57% of TypeScript online submissions for Largest Rectangle in Histogram.
 */
function largestRectangleAreaBrute2(heights: number[]): number {
  const gridHeight = [...heights].sort((a, b) => a - b)[heights.length - 1]
  const gridLength = heights.length

  const longestHorizontal = (row: number) => {
    let max = 0
    let cur = 0
    for (const height of heights) {
      height > row ? cur++ : (cur = 0)
      cur > max && (max = cur)
    }
    return max
  }

  let maxArea = 0

  // printGrid(gridLength, gridHeight, heights)

  for (let i = gridHeight - 1; i >= 0; i--) {
    const area = longestHorizontal(i) * (i + 1)
    maxArea = area > maxArea ? area : maxArea
    if (maxArea > (i + 1) * gridLength) return maxArea
  }
  return maxArea
}

const examples = [[2, 1, 5, 6, 2, 3], [2, 4], [2]]

run(examples, largestRectangleArea)

// OOPSIES
function findLongestHorizontalBrute(row: boolean[]): number {
  let max = 0
  let cur = 0
  for (const cell of row) {
    cell ? cur++ : (cur = 0)
    cur > max && (max = cur)
  }
  return max
}

/**
 * LOL heap out of memory error... whoops.
 */
function largestRectangleAreaBrute(heights: number[]): number {
  const gridHeight = [...heights].sort((a, b) => a - b)[heights.length - 1]
  const gridLength = heights.length
  const grid: boolean[][] = []

  for (let i = 0; i < gridHeight; i++) {
    grid[i] = []
    for (let j = 0; j < gridLength; j++) {
      grid[i].push(heights[j] > i ? true : false)
    }
  }

  let maxArea = 0

  // printGrid(grid)

  for (let i = grid.length - 1; i >= 0; i--) {
    const area = findLongestHorizontalBrute(grid[i]) * (i + 1)
    maxArea = area > maxArea ? area : maxArea
    if (maxArea > (i + 1) * gridLength) return maxArea
  }
  return maxArea
}
