import React from 'react'
import { render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('<Blog /> renders the title and author', () => {
  const blog = {
    author: 'name',
    title: 'title',
    url:'url.com',
    upvotes: '0'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleUpvote={mockHandler} deleteBlog={mockHandler}/>
  )

  const div = component.container.querySelector('.blog-summary')
  expect(div).toHaveTextContent(`${blog.title} : ${blog.author}`)

  const button = component.getByText('view')
  fireEvent.click(button)

  const blogInfo = component.container.querySelector('.blog-info')
  expect(blogInfo).toHaveTextContent(`${blog.upvotes}`)
})

test('clicking on like fires the event correctly', () => {
  const user = {
    username:'username',
    password:'pass'
  }

  const blog = {
    author: 'name',
    title: 'title',
    url:'url.com',
    upvotes: '0',
    user
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} handleUpvote={mockHandler} deleteBlog={() => {}} user={user}/>
  )
  const button = component.container.querySelector('.blog-likes')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
  expect(`${blog.upvotes}`).toBe('2')
})