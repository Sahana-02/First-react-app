import { useRef } from 'react'
import ItemList from './ItemList'

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const categoryRef = useRef(null)

  const handleClick = () => {
    setShowIndex()
    if (categoryRef.current) {
      window.scrollTo({
        top: categoryRef.current.textContent,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div ref={categoryRef}>
      <div className='w-6/12 mx-auto my-3 shadow-lg p-2 cursor-pointer'>
        <div className='flex justify-between' onClick={handleClick}>
          <span className='font-bold'>
            {data.title}({data.itemCards.length})
          </span>
          <span>⬇</span>
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  )
}

export default RestaurantCategory
