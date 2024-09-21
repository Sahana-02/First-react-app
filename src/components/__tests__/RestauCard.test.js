import { screen, render } from '@testing-library/react'
import RestauCard from '../RestauCard'
import MOCK_DATA from '../mocks/mockData.json'
import '@testing-library/jest-dom'

test('Testing restaurant card', () => {
  render(<RestauCard resData={MOCK_DATA} />)

  const restauName = screen.getByText('Chinese Wok')
  expect(restauName).toBeInTheDocument()
})
