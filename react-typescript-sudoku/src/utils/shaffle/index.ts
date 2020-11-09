/**
 * An array shaffling using the Fisher-Yates shaffle algorithm
 * @param array An array that you want to shaffle
 */

function shaffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default shaffle
