import React, { Component } from 'react'
import logo from '../../media/logo.png'
import './Auth.css'

export default class Auth extends Component {
  constructor() {
    super()
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

  render() {
    const { username, password } = this.state
    return (
      <div className='Auth'>
        <div className='container'>
          <img src={logo} alt='logo' />
          <h1>Helo</h1>
          <div className='input-container'>
            <label>Username:</label>
            <input
              name='username'
              value={username}
              onChange={e => this.handleIput(e)}
            />
          </div>
          <div className='input-container'>
            <label>Password:</label>
            <input
              name='password'
              value={password}
              onChange={e => this.handleIput(e)}
            />
          </div>
          <div>
            <button
              onClick={() => {
                this.setState({ username: '', password: '' })
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
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
