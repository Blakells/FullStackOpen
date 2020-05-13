const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes
test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
    ]
    
    const listWithTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has more than one blog', () => {
        const result = totalLikes(listWithTwoBlogs)
        expect(result).toBe(10)
    })
})

describe('favorite blog', () => {

    const oneBlog = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          }
        ]

    const twoBlogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          },
          {
            title: "The Biggest Blog",
            author: "Biggy Blogs",
            likes: 24
          }
    ]

    test('when there is only one blog', () => {
        const result = favoriteBlog(oneBlog)
        expect(result).toEqual(oneBlog[0])
    })

    test('when there are multiple blogs', () => {
        const result = favoriteBlog(twoBlogs)
        expect(result).toEqual(twoBlogs[1])
    })
})

describe('author with most blogs', () => {
    const blogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title:"Bloggy Blogs",
            author: "Biggy Blogs",
            likes: 999
        }
    ]
    test('within a list of many blogs', () => {
        const result = mostBlogs(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 3
        })
    })
})

describe('author with most likes', () => {
    const blogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title:"Bloggy Blogs",
            author: "Biggy Blogs",
            likes: 999
        }
    ]

    test('within a list of many blogs', () => {
        const result = mostLikes(blogs)
        expect(result).toEqual({
            author: "Biggy Blogs",
            likes: 999
        })
    })
})

