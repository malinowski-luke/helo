import React, { Component } from 'react'
import searchLogo from '../../media/search.png'
import PostDisplay from '../PostDisplay/PostDisplay'
import './Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      search: '',
      userpost: false
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { posts, search } = this.state
    return (
      <div className='Dashboard'>
        <div className='search-container'>
          <div className='search-sub-container'>
            <input
              name='search'
              value={search}
              placeholder='search by keyword'
              className='search-input'
              onChange={e => this.handleInput(e)}
            />
            <div className='box-button'>
              <img src={searchLogo} alt='search-icon' />
            </div>
            <button
              onClick={() => this.setState({ search: '' })}
              className='reset-button'
            >
              Reset
            </button>
          </div>
          <div className='search-sub-container'>
            <p>My posts</p>
            <input type='checkbox' />
          </div>
        </div>
        <div className='post-container'>
          <PostDisplay />
          <PostDisplay />
        </div>
      </div>
    )
  }
}

export default Dashboard
