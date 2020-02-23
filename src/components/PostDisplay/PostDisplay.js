import React from 'react'
import './PostDisplay.css'

const PostDisplay = props => {
  const { post } = props
  return (
    <div className='PostDisplay'>
      <h1 className='title text'>{post.title}</h1>
      <div>
        {/* work on this */}
        {/* <p className='author text'>by test</p> */}
        {/* <img /> */}
      </div>
    </div>
  )
}

export default PostDisplay
