import { useDispatch } from 'react-redux'
import { CDN_URL } from '../utils/constants'
import { addItem } from '../utils/cartSlice'
import { Routes } from 'react-router-dom'

const ItemList = ({ items }) => {
  const dispatch = useDispatch()
  const handleAddItem = (item) => {
    dispatch(addItem(item))
    console.log(item)
  }
  return (
    <div>
      {items?.map((item) => (
        <div key={item?.card?.info?.id} className='my-3 '>
          <div className='flex justify-between'>
            <div>
              <span className='font-bold flex justify-start'>
                {item.card.info.name}
              </span>
              <span className='flex justify-start'>
                ₹{' '}
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
              <p className='text-left text-sm w-72 font-light text-gray-400 '>
                {item.card.info.description}
              </p>
            </div>
            <div className=''>
              <div className='absolute'>
                <button
                  className='bg-gray-950  mx-20 p-2 rounded-lg text-white'
                  onClick={() => {
                    handleAddItem(item)
                  }}
                >
                  Add +
                </button>
              </div>
              <img
                className='size-36 rounded-2xl'
                // alt='res-logo'
                src={CDN_URL + item.card.info.imageId}
              ></img>
            </div>
          </div>
          <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700'></hr>
        </div>
      ))}
    </div>
  )
}

export default ItemList
