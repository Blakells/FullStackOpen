import React from 'react'
import { render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> renders correctly', () => {
  const mockHandler = jest.fn()
  const blog = {
    title: '',
    author: 'blank',
    url: 'url.com'
  }

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const form = component.container.querySelector('form')
  fireEvent.submit(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
})