import RestauCard from './RestauCard'
import { useState, useEffect } from 'react'
import Shimmer from './Shimmer'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([])
  const [searchList, setSearchList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [offset, setOffset] = useState(0) // Track the current offset for scroll
  const [isLoading, setIsLoading] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')
  const [deviceId, setDeviceId] = useState('')
  const [sid, setSid] = useState('')
  const [tid, setTid] = useState('')

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset, isLoading])

  const fetchInitialData = async () => {
    setIsLoading(true)
    const initialUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    try {
      const restauData = await fetch(initialUrl)
      const jsonData = await restauData.json()

      const newRestaurants =
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []

      setCsrfToken(jsonData.csrfToken)
      setDeviceId(jsonData.deviceId)
      setSid(jsonData.sid)
      setTid(jsonData.tid)

      setListOfRestaurants(newRestaurants)
      setSearchList(newRestaurants)
    } catch (error) {
      console.error('Failed to fetch initial data:', error)
    }
    setIsLoading(false)
  }

  const fetchMoreData = async (newOffset) => {
    setIsLoading(true)
    const updateUrl = `http://localhost:5000/proxy?url=https://www.swiggy.com/dapi/restaurants/list/update?lat=12.9715987&lng=77.5945627&offset=${newOffset}`
    try {
      const restauData = await fetch(updateUrl, {
        headers: {
          'x-csrf-token': csrfToken,
          'x-device-id': deviceId,
          'x-sid': sid,
          'x-tid': tid
        }
      })
      const jsonData = await restauData.json()
      console.log(jsonData)

      if (jsonData.statusCode === 0) {
        const newRestaurants =
          jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || []
        setListOfRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          ...newRestaurants
        ])
        setSearchList((prevRestaurants) => [
          ...prevRestaurants,
          ...newRestaurants
        ])
      } else {
        console.error('Failed to fetch more data:', jsonData.statusMessage)
      }
    } catch (error) {
      console.error('Failed to fetch more data:', error)
    }
    setIsLoading(false)
  }

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isLoading
    ) {
      const newOffset = offset + 15 // Assuming 15 items per page
      setOffset(newOffset)
      //   fetchMoreData(newOffset);
    }
  }

  const filterData = (searchData) => {
    const filteredList = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchData.toLowerCase())
    )
    setSearchList(filteredList)
  }

  const onlineStatus = useOnlineStatus()
  if (onlineStatus === false) {
    console.log(onlineStatus + ' status')
    return <h1>Looks like you are offline</h1>
  }

  if (listOfRestaurants.length === 0 && !isLoading) {
    return <Shimmer />
  }

  return (
    <div className='body'>
      <div className='filter flex'>
        <div className='search p-4 m-4 '>
          <input
            type='text'
            data-testid='searchInput'
            className='border border-solid border-black focus:ring-2 rounded-md focus:outline-none'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
          />
          <button
            className='px-4 py-1 m-2 bg-green-100 rounded-md'
            onClick={() => {
              filterData(searchText)
              // console.log(searchText)
            }}
          >
            Search
          </button>
        </div>
        <div className='search  m-4 flex items-center'>
          {' '}
          <button
            className='px-4 py-1 bg-green-100 rounded-md'
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.5
              )
              setSearchList(filteredList)
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div data-testid='restCard' className='flex flex-wrap'>
        {searchList.map((restaurant) => (
          <Link to={'/restaurants/' + restaurant.info.id}>
            <RestauCard key={restaurant.info.id} resData={restaurant} />
          </Link>
        ))}
      </div>
      {isLoading && <Shimmer />}
    </div>
  )
}

export default Body
