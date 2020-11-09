import { GRID } from 'Typings'
import { fillGrid } from 'utils'

/**
 * A function to create a full valid sudoku grid
 */

function createFullGrid(): GRID {
  const grid: GRID = [
    [0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 6],
    [0, 5, 0, 0, 0, 0, 0, 0, 0],
  ]
  fillGrid(grid)
  return grid
}

export default createFullGrid
