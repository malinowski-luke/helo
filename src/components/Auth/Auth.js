import React, { Component } from 'react'
import logo from '../../media/logo.png'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducer'
import axios from 'axios'
import './Auth.css'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleIput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = () => {
    const { username, password } = this.state
    if (username !== '' || password !== '') {
      axios
        .post('/api/auth/register', {
          username,
          password
        })
        .then(res => {
          this.props.getUser(res.data)
          this.props.history.push('/dashboard')
        })
        .catch(err => alert(err.response.request.response))
    } else alert('plsese fill out username and password fields')
  }

  handleLogin = () => {
    const { username, password } = this.state
    axios
      .post('/api/auth/login', {
        username,
        password
      })
      .then(res => {
        this.props.getUser(res.data)
        this.props.history.push('/dashboard')
      })
      .catch(err => alert(err.response.request.response))
  }

  render() {
    const { username, password } = this.state
    return (
      <div className='Auth'>
        <div className='container'>
          <img src={logo} alt='logo' />
          <h1 className='auth-header'>Helo</h1>
          <div className='input-container'>
            <label className='auth-label'>Username:</label>
            <input
              name='username'
              value={username}
              onChange={e => this.handleIput(e)}
            />
          </div>
          <div className='input-container'>
            <label className='auth-label'>Password:</label>
            <input
              name='password'
              value={password}
              onChange={e => this.handleIput(e)}
            />
          </div>
          <div>
            <button
              className='auth-button'
              onClick={() => {
                this.handleLogin()
                this.setState({ username: '', password: '' })
              }}
            >
              Login
            </button>
            <button
              className='auth-button'
              onClick={() => {
                this.handleRegister()
                this.setState({ username: '', password: '' })
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { getUser })(Auth)
