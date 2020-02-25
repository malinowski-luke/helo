import React, { Component } from 'react'
import postLogo from '../../media/post.png'
import homeLogo from '../../media/home.png'
import logoutLogo from '../../media/logout.png'
import { connect } from 'react-redux'
import { logout, getUser } from '../../redux/reducer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Nav.css'

class Nav extends Component {
  componentDidMount() {
    this.validateUserSession()
  }

  logout = () => {
    axios.post('/api/auth/logout').then(() => {
      this.props.logout()
      this.props.history.push('/')
    })
  }

  validateUserSession = () => {
    axios
      .get('/api/user')
      .then(res => this.props.getUser(res.data))
      .catch(() => this.props.history.push('/'))
  }

  render() {
    const { user } = this.props
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
          <img
            src={logoutLogo}
            alt='logout'
            className='img'
            onClick={this.logout}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState
  return { user }
}

export default connect(mapStateToProps, { logout, getUser })(Nav)
