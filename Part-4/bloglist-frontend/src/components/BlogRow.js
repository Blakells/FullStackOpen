import React from 'react'
import {Link} from 'react-router-dom'

const BlogRow = (props) => {
    const blog = props.blog

    return (
        <Link to={`blogs/${blog.id}`}>{blog.title} ({blog.author})</Link>
    )
}

export default BlogRow