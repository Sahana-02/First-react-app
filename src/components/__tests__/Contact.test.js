import { render, screen } from '@testing-library/react'
import Contact from '../Contact'
import '@testing-library/jest-dom'

it('Testing contact us page', () => {
  render(<Contact />)
  const heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument()
  const button = screen.getByRole('button')
  expect(button).toBeInTheDocument()
})
test('Testing button in page', () => {
  render(<Contact />)
  const button = screen.getByRole('button')
  expect(button).toBeInTheDocument()
})
test('Testing count of input fields', () => {
  render(<Contact />)

  const inputFields = screen.getAllByRole('textbox')
  expect(inputFields.length).toBe(2)
})
