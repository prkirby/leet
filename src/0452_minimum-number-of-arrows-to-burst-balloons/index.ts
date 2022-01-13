/**
 * Title: Minimum Number of Arrows to Burst Balloons
 * Category: Algorithms
 * Difficulty: Medium
 * URL: https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
 * ID: 0452
 * Created: Wed Jan 12 2022
 */

/**
Example Cases: 

[[10,16],[2,8],[1,6],[7,12]]
[[1,2],[3,4],[5,6],[7,8]]
[[1,2],[2,3],[3,4],[4,5]]

*/

import run from '../utils'
// import { } from '../utils/print-functions'

/**
Runtime: 495 ms, faster than 28.57% of TypeScript online submissions for Minimum Number of Arrows to Burst Balloons.
Memory Usage: 69 MB, less than 28.57% of TypeScript online submissions for Minimum Number of Arrows to Burst Balloons.
 */
/** Main Code Snippet */
function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[1] - b[1])
  console.log(points)
  let arrows = 1
  let rightEdge = points[0][1]
  let index = 1
  while (index < points.length) {
    if (points[index][0] > rightEdge) {
      arrows++
      rightEdge = points[index][1]
    }
    index++
  }

  return arrows
}

const examples = [
  [
    [3, 9],
    [7, 12],
    [3, 8],
    [6, 8],
    [9, 10],
    [2, 9],
    [0, 9],
    [3, 9],
    [0, 6],
    [2, 8],
  ],
]

run(() => {
  /**
   * Write out to console here
   */
  for (const example of examples) {
    console.log('Points: ', example)
    console.log(findMinArrowShots(example))
  }
})
