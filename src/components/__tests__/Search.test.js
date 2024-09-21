import { fireEvent, render, screen } from '@testing-library/react'
import Body from '../Body'
import MOCK_DATA from '../mocks/searchMockData.json'
import { BrowserRouter } from 'react-router-dom'
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA)
    }
  })
})
it('Should Search restaurant card', () => {
  render(
    <BrowserRouter>
      <Body />
    </BrowserRouter>
  )
  const searchBtn = screen.getByRole('button', { name: 'Search' })
  const searchInput = screen.getByTestId('searchInput')
  fireEvent.change(searchInput, { target: { value: 'burger' } })
  fireEvent.click(searchBtn)
  const cards = screen.getAllByTestId('restCard')
  expect(cards.length).toBe(1)
})
