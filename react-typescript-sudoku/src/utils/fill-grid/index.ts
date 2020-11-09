import { GRID, NUMBERS } from 'Typings'
import {
  checkGrid,
  shaffle,
  isInRow,
  isInCol,
  isInSquare,
  indentifySquare,
} from 'utils'

/**
 *
 * @param grid 9x9 sudoku grid
 */

const numbers: NUMBERS[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function fillGrid(grid: GRID) {
  let row = 0
  let col = 0

  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9)
    col = i % 9

    if (grid[row][col] === 0) {
      shaffle(numbers)

      for (let value of numbers) {
        if (!isInRow({ grid, row, value }))
          if (!isInCol({ col, grid, value })) {
            const square = indentifySquare({ col, grid, row })
            if (!isInSquare({ square, value })) {
              grid[row][col] = value
              if (checkGrid(grid, 0)) return true
              else if (fillGrid(grid)) return true
            }
          }

        grid[row][col] = value
      }
      break
    }
  }
  grid[row][col] = 0
}

export default fillGrid
