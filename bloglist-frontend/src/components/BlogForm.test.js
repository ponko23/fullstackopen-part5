import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const Wrapper = (props) => {

  const onTitleChange = (event) => {
    props.state.title = event.target.value
  }
  const onAuthorChange = (event) => {
    props.state.author = event.target.value
  }
  const onUrlChange = (event) => {
    props.state.url = event.target.value
  }

  return (
    <BlogForm
      onSubmit={props.onSubmit}
      title={props.state.title}
      author={props.state.author}
      url={props.state.url}
      handleTitleChange={onTitleChange}
      handleAuthorChange={onAuthorChange}
      handleUrlChange={onUrlChange}
    />
  )
}

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const onSubmit = jest.fn()
  const state = {
    title: '',
    author: '',
    url: ''
  }

  const component = render(
    <Wrapper onSubmit={onSubmit} state={state} />
  )

  const titleInput = component.container.querySelector('.titleInput')
  const authorInput = component.container.querySelector('.authorInput')
  const urlInput = component.container.querySelector('.urlInput')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'testTitle' } })
  fireEvent.change(authorInput, { target: { value: 'testAuthor' } })
  fireEvent.change(urlInput, { target: { value: 'testUrl' } })
  fireEvent.submit(form)

  expect(onSubmit.mock.calls.length).toBe(1)
  expect(state.title).toBe('testTitle')
  expect(state.author).toBe('testAuthor')
  expect(state.url).toBe('testUrl')
})
