import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog , handleUpvote, deleteBlog}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
      const [visible, setVisibie] = useState(false)

      const hideWhenVisible = { display: visible ? 'none' : '' }
      const showWhenVisible = { display: visible ? '' : 'none' }

      const toggleVisibility = () => {
          setVisibie(!visible)
      }

      const addVote = (event) => {
          event.stopPropagation()
          handleUpvote({
              ...blog,
              user: blog.user.id,
              upvotes: ++blog.upvotes
          })
      }

      const handleDeletion = (event) => {
          event.preventDefault()
          const shouldDelete = window.confirm(`remove blog ${blog.title}?`)
          if (shouldDelete) {
              deleteBlog(blog.id)
          }
      }

return (
    <div style={blogStyle}>
        <div style={hideWhenVisible} className='blog-summary'>
        <p>
        {blog.title} : {blog.author} <button onClick={toggleVisibility} id='view-button'> view</button>
        </p>
    </div>
    <div style={showWhenVisible} className='blog-info'>
        <p>Title: {blog.title} <button onClick={toggleVisibility}>hide</button>
        </p>
        <p>URL: {blog.url}</p>
        <p>Upvotes: {blog.upvotes}<button onClick={addVote} className='blog-likes'>upvote</button></p>
        <p>Author: {blog.author}</p>
        <button onClick={handleDeletion} id='delete-button'>delete</button>
    </div>
    </div>
)
    }

    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
        handleUpvote: PropTypes.func.isRequired,
        deleteBlog: PropTypes.func.isRequired
    }

export default Blog