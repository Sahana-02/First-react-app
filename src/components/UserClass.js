import React from 'react'
import userContext from '../utils/userContext'

class UserClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {
        name: 'dummy',
        location: 'location',
        avatar_url: ''
      }
    }
  }

  async componentDidMount() {
    const data = await fetch('https://api.github.com/users/Sahana-02')
    const json = await data.json()
    this.setState({
      userInfo: json
    })
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo
    return (
      <div className='user-card'>
        <img className='size-32 full rounded-full' src={avatar_url}></img>
        <userContext.Consumer>
          {({ loggedInUSer }) => <h1>{loggedInUSer}</h1>}
        </userContext.Consumer>
        <h3>Name: {name}</h3>
        <h4>Location: {location}</h4>
        <h4>Contact:sahana@02</h4>
      </div>
    )
  }
}

export default UserClass
