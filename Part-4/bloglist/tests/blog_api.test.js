const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
let token = ''

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    const response =  await api.post('/api/login')
    .send({
        username: "root",
        password: "secret"
    })
    token = response.body.token
    console.log(token)
})

test('blogs are returned', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique id is named "id"', async () => {
    const blogs = await helper.blogsInDb()

    const blogToView = blogs[0]

    const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be added', async () => {
    const newBlog = {
        title: 'Discourses',
        author: 'Epictetus',
        url: 'discourses.com',
        upvotes: '49'
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
        'Discourses'
    )
})

test('if upvotes is missing then it defaults to zero', async () => {
    const newBlog = {
        title: 'Letters from a Stoic',
        author: 'Seneca',
        url: 'seneca.com'
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const upvotes = blogsAtEnd.map( n => n.upvotes)
    expect(upvotes).toContain(
        '0'
    )
})

test('if title/url is missing it does not add the blog', async () => {
    const newBlog = {
        author: 'Blake',
        upvotes: '50'
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('if user is unauthorized, adding a blog fails', async() => {
    const newBlog = {
        title: 'Discourses',
        author: 'Epictetus',
        url: 'discourses.com',
        upvotes: '49'
    }
    //token = 'this is not the right token'
    await api
    .post('/api/blogs')
    //.set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})