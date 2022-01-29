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
import { Stack } from '../utils/stack'
// import { } from '../utils/print-functions'

// https://en.wikipedia.org/wiki/Monotone_priority_queue

//APPROACH 2 : Using Left-Smaller & Right-Smaller Arrays
//https://leetcode.com/problems/largest-rectangle-in-histogram/discuss/1727605/C%2B%2B-Simple-Solution-or-Brute-Force-Optimal-or-W-Explanation
function largestRectangleArea(heights: number[]): number {
  if (!heights) return 0
  const n = heights.length
  if (n === 1) return heights[0]
  let stack: Stack<number> = new Stack()
  const leftBounds = new Array<number>(heights.length).fill(-1)
  const rightBounds = new Array<number>(heights.length).fill(n - 1)

  // Left smaller
  for (let i = 0; i < n; i++) {
    // clear stack indexes that are taller than current
    while (!stack.empty() && heights[i] <= heights[stack.peek()!]) stack.pop()
    if (stack.empty()) {
      leftBounds[i] = 0
    } else {
      leftBounds[i] = stack.peek()! + 1
    }
    stack.push(i)
  }

  stack.clear()

  // Right smaller
  for (let i = n - 1; i >= 0; i--) {
    // clear stack indexes that are taller than current
    while (!stack.empty() && heights[i] <= heights[stack.peek()!]) stack.pop()
    if (stack.empty()) {
      rightBounds[i] = n - 1
    } else {
      rightBounds[i] = stack.peek()! - 1
    }
    stack.push(i)
  }

  // console.log(heights, leftBounds, rightBounds)

  let max = 0
  for (let i = 0; i < n; i++) {
    max = Math.max(max, (rightBounds[i] - leftBounds[i] + 1) * heights[i])
  }

  // Calculate areas

  return max
}

const examples = [[2, 1, 5, 6, 2, 3], [2, 4], [2], [2, 1, 2], [], [0, 9]]

run(examples, largestRectangleArea)

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
