import React, { Component } from 'react'
import defaultImg from '../../media/empty-image.png'
import './Form.css'
import { connect } from 'react-redux'
import axios from 'axios'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      img: '',
      content: ''
    }
  }

  addPost = () => {
    const { title, img, content } = this.state
    const { user_id } = this.props.user
    if (title === '' || img === '' || content === '')
      alert('plsease fill out all the fields')
    else {
      axios
        .post(`/api/post/${user_id}`, { title, img, content, user_id })
        .then(() => {
          this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { img } = this.state
    return (
      <div className='Form'>
        <div className='new-post-container'>
          <h1 className='new-post-header'>New Post</h1>
          <div className='new-post-form'>
            <div>
              <label htmlFor='title' className='label'>
                Title:
              </label>
              <input
                name='title'
                className='input-style'
                onChange={this.handleInput}
              />
            </div>
            <div>
              <img
                src={img || defaultImg}
                className='new-post-img'
                alt='post img'
              />
            </div>
            <div>
              <label htmlFor='img' className='label'>
                Image URL:
              </label>
              <input
                name='img'
                className='input-style'
                onChange={this.handleInput}
              />
            </div>
            <div>
              <label htmlFor='content' className='label'>
                Content:
              </label>
              <textarea
                name='content'
                rows='5'
                className='textarea'
                onChange={this.handleInput}
              />
            </div>
          </div>
          <div className='button-container'>
            <button
              className='post-button'
              onClick={() => {
                this.addPost()
                this.setState({
                  title: '',
                  img: '',
                  content: ''
                })
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState
  return {
    user
  }
}

export default connect(mapStateToProps, {})(Form)
