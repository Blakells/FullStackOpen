const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        title: 'meditations',
        author: 'Aurelius',
        url: 'meditations.com',
        upvotes: '55'
    }
]

const initialUsers = [
  {
    username: "root",
    password: "secret"
  }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDb
}