import React from 'react'
import './PostDisplay.css'

const PostDisplay = props => {
  const { post } = props
  return (
    <div className='PostDisplay'>
      <h1 className='title-text'>{post.title}</h1>
      <div className='user-info-container'>
        <p className='author'>by {post.username}</p>
        <div className='user-profile-img-container'>
          <img
            src={post.profile_pic}
            alt='user profile pic'
            className='user-profile-img'
          />
        </div>
      </div>
    </div>
  )
}

export default PostDisplay
