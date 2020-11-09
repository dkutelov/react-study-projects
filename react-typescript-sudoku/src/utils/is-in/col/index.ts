import { GRID, NUMBERS } from 'Typings'

interface IInput {
  grid: GRID
  col: number
  value: NUMBERS
}

/**
 * A  function that returns true if the value is already being used in the current column.
 * @param input Column index, Object with  9x9  Sudoku  Grid and value
 */

function isInCol({ col, grid, value }: IInput): boolean {
  for (let i = 0; i < 9; i++) if (value === grid[i][col]) return true
  return false
}

export default isInCol
