import { useDispatch, useSelector } from 'react-redux'
import ItemList from './ItemList'
import { clearCart } from '../utils/cartSlice'
import emptyCart from '../imgs/emptyCart.png'
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items)
  const dispatch = useDispatch()

  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <div className='text-center m-4 p-4 '>
      <h1 className='font-bold text-2xl'>Cart</h1>
      <button
        className='m-2 p-2 bg-black text-white rounded-lg'
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      <div className='w-6/12 m-auto'>
        <ItemList items={cartItems} />
      </div>
      {cartItems.length === 0 && (
        <div>
          <img className='m-auto' src={emptyCart} />
        </div>
      )}
    </div>
  )
}

export default Cart
