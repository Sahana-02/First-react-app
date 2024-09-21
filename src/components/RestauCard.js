import { CDN_URL } from '../utils/constants'

const StyleCard = {
  backgroundColor: '#f0f0f0'
}
const RestauCard = (props) => {
  const { resData } = props
  console.log(resData)
  const { name, cuisines, avgRating } = resData.info
  const { slaString } = resData.info.sla

  return (
    <div
      className='m-2 p-2 w-[200px] h-[340] rounded-md'
      data-testid='restCard'
    >
      <img
        className='size-32 w-64 rounded-xl hover:scale-110'
        // alt='res-logo'
        src={CDN_URL + resData.info.cloudinaryImageId}
      ></img>
      <h3 className='font-bold py-2 text-md line-clamp-1 w-40 '>{name}</h3>
      <h4>{'⭐' + avgRating}</h4>
      <h5 className='line-clamp-1'>{cuisines.join(', ')}</h5>

      <h4>{slaString}</h4>
    </div>
  )
}

export default RestauCard
