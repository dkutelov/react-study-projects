import { SQUARE } from 'Typings'

import isInSquare from './'

describe('isInSquare', () => {
  it('Returns true when value is in grid square', () => {
    const square: SQUARE = [
      [1, 3, 4],
      [8, 2, 7],
      [6, 9, 5],
    ]

    expect(isInSquare({ square, value: 1 })).toBeTruthy()
    expect(isInSquare({ square, value: 9 })).toBeTruthy()
  })

  it('Returns false when value is not in grid square', () => {
    const square: SQUARE = [
      [0, 3, 4],
      [8, 2, 7],
      [6, 0, 5],
    ]

    expect(isInSquare({ square, value: 1 })).toBeFalsy()
    expect(isInSquare({ square, value: 9 })).toBeFalsy()
  })
})
