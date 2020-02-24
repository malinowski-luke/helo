import React, { Component } from 'react'
import defaultImg from '../../media/empty-image.png'
import { connect } from 'react-redux'
import axios from 'axios'
import './Post.css'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    this.getPost()
  }

  getPost = () => {
    const { post_id } = this.props.match.params
    axios
      .get(`/api/post/${post_id}`)
      .then(res => {
        this.setState({ post: res.data })
      })
      .catch(err => console.log(err))
  }

  deletePost = () => {
    const { post_id } = this.props.match.params
    const { user_id } = this.props.user
    const { author_id } = this.state.post
    if (user_id === author_id) {
      axios
        .delete(`/api/post/${post_id}`)
        .then(() => {
          this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    } else alert('only the author of this post can delete this post')
  }

  render() {
    const { post } = this.state
    console.log(this.state.post)
    return (
      <div className='Post'>
        <div className='post-container'>
          <div className='post-header'>
            <h1 className='post-title'>{post.title}</h1>
            <div>
              <p>by</p>
              <img src alt='user img' className='' />
            </div>
          </div>
          <div className='post-body'>
            <img
              src={post.img || defaultImg}
              alt='post-img'
              className='post-img'
            />
            <div>
              <p className='post-content'>{post.content}</p>
              <div className='post-button-container'>
                <button className='post-button' onClick={this.deletePost}>
                  Delete
                </button>
                <button
                  className='post-button'
                  onClick={() => {
                    this.props.history.push('/dashboard')
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapsStateToProps = reduxState => {
  const { user } = reduxState
  return { user }
}
export default connect(mapsStateToProps, {})(Post)
