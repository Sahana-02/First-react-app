import { useState, useEffect, useContext } from 'react'

const User = () => {
  const [userInfo, setUserInfo] = useState()
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://api.github.com/users/Sahana-02')
    const data = await response.json()
    setUserInfo(data)
  }
  const { avatar_url, name, location, login } = userInfo
  return (
    <div className='user-card'>
      <img className='size-32 full rounded-full' src={avatar_url}></img>
      <h3>Name: {name}</h3>
      <h4>Location: {location}</h4>
      <h4>Contact: {login}</h4>
    </div>
  )
}

export default User
