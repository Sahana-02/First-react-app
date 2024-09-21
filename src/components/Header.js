import { LOGO_URL } from '../utils/constants'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import userContext from '../utils/userContext'
import { useSelector } from 'react-redux'
const Header = () => {
  const [btnName, setBtnName] = useState('Login')
  const onlineStatus = useOnlineStatus()
  const { loggedInUSer } = useContext(userContext)
  const cartItems = useSelector((store) => store.cart.items)
  return (
    <div className='flex 	justify-between ml-2 mr-2 bg-gray-200'>
      <div className='logo-container'>
        <img className='w-28' src={LOGO_URL}></img>
      </div>
      <div className='flex items-center'>
        <ul className='flex'>
          <li className='px-3'>Online Status : {onlineStatus ? '✅' : '🔴'}</li>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li className='px-3'>
            {' '}
            <Link to='/about'>About Us</Link>
          </li>
          <li className='px-3'>
            {' '}
            <Link to='/contact'>Contact Us</Link>
          </li>
          <li className='px-3'>
            {' '}
            <Link to='/grocery'>Grocery</Link>
          </li>
          <li className='px-3 font-bold text-xl'>
            {' '}
            <Link to='/cart'>🛒{cartItems.length} items</Link>
          </li>
          <button
            className='px-3'
            onClick={() => {
              btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login')
            }}
          >
            {btnName}
          </button>
          <li className='px-3 font-bold'>{loggedInUSer}</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
