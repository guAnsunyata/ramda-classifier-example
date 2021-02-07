import { recordsOf } from '../src/script/records-of'

// example for testing unit functions, composed in main function
test('test record query by category', () => {
  const records = [
    { attrs: [], category: 'c1' },
    { attrs: [], category: 'c1' },
    { attrs: [], category: 'c2' },
  ]

  const result = recordsOf(records)('c1')

  expect(result).toEqual([
    { attrs: [], category: 'c1' },
    { attrs: [], category: 'c1' },
  ])
})

test('test record query by attr in certain category', () => {
  const records = [
    { attrs: ['a', 'b'], category: 'c1' },
    { attrs: ['a', 'b'], category: 'c1' },
    { attrs: ['b', 'c'], category: 'c1' },
    { attrs: ['a', 'b', 'c'], category: 'c2' },
  ]

  const result = recordsOf(records)('c1', 'a')

  expect(result).toEqual([
    { attrs: ['a', 'b'], category: 'c1' },
    { attrs: ['a', 'b'], category: 'c1' },
  ])
})
