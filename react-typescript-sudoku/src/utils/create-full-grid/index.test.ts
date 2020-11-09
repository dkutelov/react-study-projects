import createFullGrid from './'

describe('createFullGrid ', () => {
  it('creates full sudoku grid', () => {
    const grid = createFullGrid()
    for (let row in grid)
      for (let col in grid[row]) {
        expect(grid[row][col]).toBeGreaterThanOrEqual(1)
        expect(grid[row][col]).toBeLessThanOrEqual(9)
      }
  })
})
