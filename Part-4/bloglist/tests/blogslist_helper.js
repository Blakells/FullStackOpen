const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'meditations',
        author: 'Aurelius',
        url: 'meditations.com',
        upvotes: '55'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}