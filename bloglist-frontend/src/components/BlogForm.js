import React from 'react'

const BlogForm = ({ onSubmit, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
            title:
        <input
          value={title}
          name="title"
          className="titleInput"
          onChange={handleTitleChange}
        />
      </div>
      <div>
            author:
        <input
          value={author}
          name="author"
          className="authorInput"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
            url:
        <input
          type="text"
          value={url}
          name="url"
          className="urlInput"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
