import { N, ROW, GRID } from 'Typings'

/**
 *  A function that checks if the grid is full
 * @param input A 9x9 Sudiku grid and a value
 */

function checkGrid(grid: GRID, value: N): boolean {
  return !grid
    .reduce((acc: number[], curr: ROW) => [...acc, ...curr], [])
    .includes(value)
}

export default checkGrid
