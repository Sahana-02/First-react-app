import RestaurantMenu from '../RestaurantMenu'
import MOCK_DATA from '../mocks/mockResManu.json'
import { act } from 'react-dom/test-utils'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import appStore from '../../utils/appStore'
import Header from '../Header'
import { BrowserRouter } from 'react-router-dom'
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA)
  })
)
it('should load Restaurant Menu Components', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    )
  )
  const accordianHeader = screen.getByText('Namkeen(33)')
  fireEvent.click(accordianHeader)
  const itemList = screen.getAllByTestId('foodItems')
  expect(itemList.length).toBe(33)

  const addBtn = screen.getAllByRole('button', { name: 'Add +' })
  expect(addBtn.length).toBe(33)
})
