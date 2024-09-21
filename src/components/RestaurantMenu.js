import { useEffect, useState } from 'react'
import Shimmer from './Shimmer'
import { useParams } from 'react-router-dom'
import useRestaurant from '../utils/useRestaurant'
import RestaurantCategory from './RestaurantCategory'

const RestaurantMenu = () => {
  const { resId } = useParams()
  const resInfo = useRestaurant(resId)
  const [showIndex, setShowIndex] = useState()

  if (resInfo === null) return <Shimmer />
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info

  const itemCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      .itemCards
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.['card']?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    )
  // console.log(categories)
  return (
    <div className='text-center'>
      <h1 className='font-bold  my-6 p-4 text-2xl'>{name}</h1>

      {categories.map((category, index) => (
        //controlled component
        <RestaurantCategory
          key={category.card.card.title}
          data={category?.card?.card}
          showItems={index === showIndex && true}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  )
}

export default RestaurantMenu
