const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    .populate('user', {username: 1, name: 1})
    .populate('comments')
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog) {
        res.json(blog.toJSON())
    } else {
        res.status(404).end()
    }
})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//       return authorization.substring(7)
//     }
//     return null
//   }

blogsRouter.post('/', async (req, res) => {
    const body = req.body
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken) {
        return res.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        upvotes: body.upvotes || '0',
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const blogToDelete = await Blog.findById(id)
        if (!blogToDelete) {
            res.status(400).json({
                error: 'no blog with current ID'
            })
        }
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if (!decodedToken.id) {
            res.status(401).json({ error: 'token missing or invalid'})
        } else if (decodedToken.id !== blogToDelete.user.toString()) {
            res.status(401).json({error: 'Not authorized'})
        } else {
            const deletedBlog = await Blog.findByIdAndDelete(id)
            res.json(deletedBlog.toJSON())
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        upvotes: body.upvotes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    .populate('user', {username: 1, name: 1})
    .populate('comments')
    res.json(updatedBlog.toJSON())
})
// added API request to add comments onto the blog
blogsRouter.post('/:id/comments', async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id)
      const comment = new Comment({
        comment: request.body.comment,
        blog: blog._id
      })
      const result = await comment.save()
      blog.comments = blog.comments.concat(result._id)
      await blog.save()
      response.status(201).json(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = blogsRouter