/**
 * Title: Unique Paths II
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/unique-paths-ii/
 * ID: 0063
 * Created: Thu May 19 2022
 */

/**
Example Cases: 

[[0,0,0],[0,1,0],[0,0,0]]
[[0,1],[0,0]]

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/** Main Code Snippet */
// Lean into the fact that robot can only go down or left
// IE for each cell, it only has as many unique paths as the cell above and to the left of it combined
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  // Edge case where starting cell is an obstacle
  if (obstacleGrid[0][0] === 1) return 0
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  // set inital spot to 1 to designate start of path
  obstacleGrid[0][0] = 1

  // Iterate through the first row
  // If its not an obstacle, set to previous val
  // else set to zero so its not included in other paths
  for (let x = 1; x < n; x++) {
    if (!obstacleGrid[0][x]) {
      obstacleGrid[0][x] = obstacleGrid[0][x - 1]
    } else {
      obstacleGrid[0][x] = 0
    }
  }

  // Same for first column
  for (let y = 1; y < m; y++) {
    if (!obstacleGrid[y][0]) {
      obstacleGrid[y][0] = obstacleGrid[y - 1][0]
    } else {
      obstacleGrid[y][0] = 0
    }
  }

  // Now, iterate through the rest of the grid, and set each
  // path equal to the number of unique paths for series above,
  // and to the left, setting to zero if its an obstacle
  for (let y = 1; y < m; y++) {
    for (let x = 1; x < n; x++) {
      if (obstacleGrid[y][x]) {
        obstacleGrid[y][x] = 0
      } else {
        obstacleGrid[y][x] = obstacleGrid[y][x - 1] + obstacleGrid[y - 1][x]
      }
    }
  }

  return obstacleGrid[m - 1][n - 1]
}

const examples = [
  [
    [1, 0],
    [0, 0],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1],
    [0, 0],
  ],
  [
    [0, 0],
    [1, 1],
    [0, 0],
  ],
]

run(examples, uniquePathsWithObstacles)

/**
 * Brute force recursion. Time limit exceeded, need to make sure we aren't repeating paths
 */
function originaluniquePathsWithObstacles(obstacleGrid: number[][]): number {
  if (!obstacleGrid.length || obstacleGrid[0][0]) return 0

  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  let count = 0

  console.log('m', m, 'n', n)

  function helper(x: number, y: number) {
    console.log('x', x, 'y', y)
    if (x === n - 1 && y === m - 1 && !obstacleGrid[y][x]) {
      count++
      return
    }

    console.log('x 1: ', x)
    console.log('y 1: ', y)
    if (x < n - 1 && !obstacleGrid[y][x]) {
      console.log('x pass')
      helper(x + 1, y)
    }

    console.log('x 2: ', x)
    console.log('y 2: ', y)
    if (y < m - 1 && !obstacleGrid[y][x]) {
      helper(x, y + 1)
    }

    return
  }

  helper(0, 0)

  return count
}

/**
 * Cleaner recursion, but still timing out. Apparently i don't know what dynamic programming is
 */
// Lean into the fact that robot can only go down or left
// IE for each cell, it only has as many unique paths as the cell above and to the left of it combined
function recursive2uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  // Edge case where starting cell is an obstacle
  if (obstacleGrid[0][0] === 1) return 0
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  function helper(x: number, y: number): number {
    // if we are outside grid or point is obstacle, return 0 cause no path can reach
    if (x < 0 || y < 0 || obstacleGrid[y][x]) return 0
    // If we are at starting cell, this path is success, return 1
    if (x == 0 && y == 0) return 1
    // return the sum of all paths for cells above and to left of current cell
    return helper(x - 1, y) + helper(x, y - 1)
  }

  return helper(n - 1, m - 1)
}
