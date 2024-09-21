import { sum } from '../sum'
test('Returns sum of 2 numbers', () => {
  const result = sum(2, 3)
  expect(result).toBe(5)
})
