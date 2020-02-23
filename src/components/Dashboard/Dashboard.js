import React, { Component } from 'react'
import searchLogo from '../../media/search.png'
import PostDisplay from '../PostDisplay/PostDisplay'
import { connect } from 'react-redux'
import axios from 'axios'
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

  componentDidMount() {
    this.getPosts()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userpost !== this.state.userpost) this.getPosts()
  }

  getPosts = () => {
    const { search, userpost } = this.state
    if (userpost && search !== '') {
      this.searchPosts()
    } else if (userpost) {
      axios
        .get(`/api/posts/${1}`)
        .then(res => {
          this.setState({
            posts: res.data
          })
        })
        .catch(err => console.log(err))
    } else {
      axios
        .get('/api/posts')
        .then(res => {
          this.setState({
            posts: res.data
          })
        })
        .catch(err => console.log(err))
    }
  }

  handleCheckBox = () => {
    const { userpost } = this.state
    this.setState({ userpost: !userpost })
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  searchPosts = () => {
    const { search, userpost } = this.state
    const { user_id } = this.props.user
    if (search === '') alert('please enter a search keyword')
    else {
      if (userpost) {
        axios
          .get(`/api/search?keyword=${search}&author_id=${user_id}`)
          .then(res => {
            this.setState({
              posts: res.data
            })
          })
          .catch(err => console.log(err))
      } else {
        axios
          .get(`/api/search?keyword=${search}`)
          .then(res => {
            this.setState({
              posts: res.data
            })
          })
          .catch(err => console.log(err))
      }
    }
  }

  render() {
    const { posts, search } = this.state
    let postsDisplayArr = posts.map(elm => {
      return <PostDisplay key={elm.post_id} post={elm} />
    })
    return (
      <div className='Dashboard'>
        <div className='search-container'>
          <div className='search-sub-container'>
            <input
              name='search'
              value={search}
              placeholder='search by keyword'
              className='search-input'
              onChange={this.handleInput}
            />
            <div className='box-button'>
              <img
                src={searchLogo}
                alt='search-icon'
                onClick={this.searchPosts}
              />
            </div>
            <button
              onClick={() => {
                this.setState({ search: '' })
                this.getPosts()
              }}
              className='reset-button'
            >
              Reset
            </button>
          </div>
          <div className='search-sub-container'>
            <p>My posts</p>
            <input type='checkbox' onChange={this.handleCheckBox} />
          </div>
        </div>
        <div className='post-container'>{postsDisplayArr}</div>
      </div>
    )
  }
}

const mapsStateToProps = reduxState => {
  const { user } = reduxState
  return { user }
}
export default connect(mapsStateToProps, {})(Dashboard)
