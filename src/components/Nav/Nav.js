import React from 'react'
import postLogo from '../../media/post.png'
import homeLogo from '../../media/home.png'
import logoutLogo from '../../media/logout.png'
import { connect } from 'react-redux'
import { logout } from '../../redux/reducer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Nav.css'

const Nav = props => {
  const logout = () => {
    axios.post('/api/auth/logout').then(() => {
      props.logout()
      props.history.push('/')
    })
  }
  const { user } = props
  return (
    <div className='Nav'>
      <div className='main-container'>
        <div className='profile-container'>
          <div className='profile-img-container'>
            <img
              src={user.profile_pic}
              alt='profile_pic'
              className='profile-img'
            />
          </div>
          <p className='username-text'>{user.username}</p>
          <Link to='/new'>
            <img src={postLogo} alt='post' className='img' />
          </Link>
          <Link to='/dashboard'>
            <img src={homeLogo} alt='home' className='img' />
          </Link>
        </div>
        <img src={logoutLogo} alt='logout' className='img' onClick={logout} />
      </div>
    </div>
  )
}

const mapStateToProps = reduxState => {
  const { user } = reduxState
  return { user }
}

export default connect(mapStateToProps, { logout })(Nav)
