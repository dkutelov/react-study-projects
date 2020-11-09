import shuffle from './'

describe('shuffle', () => {
  it('It returns an array with the same length after being shaffled', () => {
    const array = [1, 2, 3]
    shuffle(array)
    expect(array).toHaveLength(3)
  })

  it('it returns an array with the same elements after shaffle', () => {
    const array = [1, 2, 3]
    shuffle(array)
    expect(array).toContain(1)
    expect(array).toContain(2)
    expect(array).toContain(3)
  })
})
