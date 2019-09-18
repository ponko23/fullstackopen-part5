import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'hoge',
    likes: 3,
  }

  const onClick = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={onClick} />
  )
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
    'hoge'
  )

  expect(component.container).toHaveTextContent(
    'blog has 3 likes'
  )

  const addLikeButton = component.container.querySelector('.addLikeButton')
  fireEvent.click(addLikeButton)
  fireEvent.click(addLikeButton)
  expect(onClick.mock.calls.length).toBe(2)
})
