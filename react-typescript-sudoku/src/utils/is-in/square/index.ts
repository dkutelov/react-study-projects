import { NUMBERS, SQUARE } from 'Typings'

interface IInput {
  square: SQUARE
  value: NUMBERS
}

/**
 * A function that returns true if the value is already used in the square
 * @param input 3x3 sudoku square and a value
 */

function isInSquare({ square, value }: IInput): boolean {
  return [...square[0], ...square[1], ...square[2]].includes(value)
}

export default isInSquare
