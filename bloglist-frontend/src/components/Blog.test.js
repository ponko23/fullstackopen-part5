import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test blog title',
    author: 'hoge',
    url: 'http://example.com/blog/1.html',
    likes: 3,
    user: {
      username: 'aaa'
    }
  }

  const addLikeHandler = jest.fn()
  const user = {
    username: 'aaa'
  }
  const removeBlogHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLikes={addLikeHandler} user={user} removeBlog={removeBlogHandler} />
  )

  expect(component.container).toHaveTextContent(
    'test blog title'
  )
  expect(component.container).toHaveTextContent(
    'hoge'
  )

  expect(component.container).toHaveTextContent(
    'http://example.com/blog/1.html'
  )

  expect(component.container).toHaveTextContent(
    '3 likes'
  )

  const detail = component.container.querySelector('.blogDetail')
  expect(detail).toHaveStyle('display: none')

  const title = component.container.querySelector('.blogShort')
  fireEvent.click(title)
  expect(title).toHaveStyle('display: none')

  const addLikeButton = component.container.querySelector('.addLikeButton')
  fireEvent.click(addLikeButton)
  expect(addLikeHandler.mock.calls.length).toBe(1)

  const removeBlogButton = component.container.querySelector('.removeButton')
  fireEvent.click(removeBlogButton)
  expect(removeBlogHandler.mock.calls.length).toBe(1)
})
