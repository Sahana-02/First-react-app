import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from '../../utils/appStore'
import Header from '../Header'
import '@testing-library/jest-dom'

test('Test Header', () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  )

  const loginButton = screen.getByRole('button')
  expect(loginButton).toBeInTheDocument()
})
test('login/logout button', () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  )
  const login = screen.getByRole('button', { name: 'Login' })
  fireEvent.click(login)
  const logout = screen.getByRole('button', { name: 'Logout' })
  expect(logout).toBeInTheDocument()
})
