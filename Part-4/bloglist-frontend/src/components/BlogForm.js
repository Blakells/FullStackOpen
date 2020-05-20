import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('')
    const [newTitle, setTitle] = useState('')
    const [newAuthor, setAuthor] = useState('')
    const [newUrl, setUrl] = useState('')

    const handleBlogTitle = (event) => {
        setTitle(event.target.value)
      }

      const handleBlogAuthor = (event) => {
        setAuthor(event.target.value)
      }

      const handleBlogUrl = (event) => {
        setUrl(event.target.value)
      }

      const addBlog = (event) => {
        event.preventDefault()
        createBlog({
          title: newTitle,
          author: newAuthor,
          url: newUrl
        })
        setNewBlog('')
        }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                Title:
                <input
                id='title'
                value={newTitle}
                onChange={handleBlogTitle}
                />
                </div>
                <div>
                Author:
                <input
                id='author'
                value={newAuthor}
                onChange={handleBlogAuthor}
                />
                </div>
                <div>
                    Url:
                    <input
                    id='url'
                    value={newUrl}
                    onChange={handleBlogUrl}
                    />
                </div>
                <button type='submit'>add blog</button>
            </form>
        </div>
    )
}

export default BlogForm