import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged. blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

    expect(component.container).not.toHaveTextContent(
      'React patterns'
    )
    expect(component.container).not.toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).not.toHaveTextContent(
      'Canonical string reduction'
    )
    expect(component.container).not.toHaveTextContent(
      'First class tests'
    )
    expect(component.container).not.toHaveTextContent(
      'TDD harms architecture'
    )
    expect(component.container).not.toHaveTextContent(
      'Type wars'
    )
  })

  test('user logged in all bloglist are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(6)

    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).toHaveTextContent(
      'Canonical string reduction'
    )
    expect(component.container).toHaveTextContent(
      'First class tests'
    )
    expect(component.container).toHaveTextContent(
      'TDD harms architecture'
    )
    expect(component.container).toHaveTextContent(
      'Type wars'
    )
  })
})
