import React, { useState } from 'react'

const Blog = ({ blog, addLikes, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleAddLikes = () => {
    addLikes(blog.id)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} onClick={toggleVisibility} className="blogShort">
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} className="blogDetail">
        {blog.title}<br />
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes<button type="button" onClick={handleAddLikes} className="addLikeButton">like</button><br />
        added by {blog.author}<br />
        {blog.user.username === user.username ? <button type="button" onClick={handleRemove} className="removeButton">remove</button> : ''}
      </div>
    </div>
  )
}

export default Blog
