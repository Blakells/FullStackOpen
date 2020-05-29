import React from 'react'

const BlogForm = (props) => {

      const newBlog = async (event) => {
        event.preventDefault()
        let title = event.target.title.value
        let author = event.target.author.value
        let url = event.target.url.value
        console.log(title)
        props.addBlog({
          title: title,
          author: author,
          url: url
        })
        }

    return (
        <div>
            <form onSubmit={newBlog}>
                <div>
                Title:
                <input
                id='title'
                name='title'
                />
                </div>
                <div>
                Author:
                <input
                id='author'
                name='author'
                />
                </div>
                <div>
                    Url:
                    <input
                    id='url'
                    name='url'
                    />
                </div>
                <button type='submit'>add blog</button>
            </form>
        </div>
    )
}

export default BlogForm