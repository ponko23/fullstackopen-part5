import React, { useState, useEffect, createRef } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const [message, setMessage] = useState(null)
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const sortAndSetBlogs = (old) => {
    setBlogs(old.sort((a, b) => b.likes - a.likes))
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => sortAndSetBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const setNotificationMessage = (message) => {
    setMessageStatus('notice')
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setMessageStatus('')
    }, 5000)
  }

  const setErrorMessage = (message) => {
    setMessageStatus('error')
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setMessageStatus('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      resetUsername()
      resetPassword()
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification status={messageStatus} message={message} />
      <form
        onSubmit={handleLogin}
      >
        <div>
          username
          <input {...username}
            name="Username"
          />
        </div>
        <div>
          password
          <input {...password}
            name="Password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const addLikes = async (id) => {
    const target = blogs.find(f => f.id === id)
    const updateBlog = {
      author: target.author,
      title: target.title,
      url: target.url,
      likes: target.likes + 1,
      user: target.user
    }
    try {
      const updatedBlog = await blogService.update(id, updateBlog)
      sortAndSetBlogs(blogs.map(m => m.id === updatedBlog.id ? updatedBlog : m))
    } catch(exception) {
      setErrorMessage(exception.response.data.error)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(f => f.id !== id))
    } catch(exception) {
      setErrorMessage(exception.response.data.error)
    }
  }

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      addLikes={addLikes}
      user={user}
      removeBlog={removeBlog}
    />)

  const logout = (event) => {
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      const response = await blogService.create(newBlog)
      sortAndSetBlogs(blogs.concat(response))
      setNotificationMessage(`a new blog ${response.title} by ${response.author} added`)
      setNewTitle('')
      setNewAuthor('')
    } catch(exception) {
      setErrorMessage(exception.response.data.error)
    }
  }

  const blogFormRef = createRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        onSubmit={addBlog}
        title={newTitle}
        author={newAuthor}
        url={newUrl}
        handleTitleChange={({ target }) => setNewTitle(target.value)}
        handleAuthorChange={({ target }) => setNewAuthor(target.value)}
        handleUrlChange={({ target }) => setNewUrl(target.value)}
      />
    </Togglable>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification status={messageStatus} message={message} />
      <p>
        {user.name} logged in
        <button
          type="button"
          onClick={logout}>logout</button>
      </p>
      {blogForm()}
      {rows()}
    </div>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : blogList()
      }
    </div>
  )
}

export default App
