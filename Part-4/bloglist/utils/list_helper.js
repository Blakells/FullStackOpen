const dummy = (blogs) => {
    return 1
}

const totalLikes = (posts) => {
    let sum = 0
    posts.forEach(post => {
        sum+=Number(post.likes)
    })
    return sum
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    const authors = {}
    let mostBlogsVal = 0
    let authorWithMostBlogs = ''

    blogs.forEach(blog => {
        if (authors.hasOwnProperty(blog.author)) {
            authors[blog.author]++
        } else {
            authors[blog.author] = 1
        }
    })

    for (author of Object.keys(authors)) {
        if (authors[author] > mostBlogsVal) {
            authorWithMostBlogs = author
            mostBlogsVal = authors[author]
        }
    }

    return {
        author: authorWithMostBlogs,
        blogs: mostBlogsVal
    }
}

    const mostLikes = (blogs) => {
    const authors = {}
    let mostLikesValue = 0
    let authorWithMostLikes = null
  
    if (!blogs.length) return null
  
    blogs.forEach(blog => {
      if (authors.hasOwnProperty(blog.author)) {
        authors[blog.author] += blog.likes
      } else {
        authors[blog.author] = blog.likes
      }
    })
  
    for (author of Object.keys(authors)) {
      if (authors[author] > mostLikesValue) {
        authorWithMostLikes = author
        mostLikesValue = authors[author]
      }
    }
  
    return {
      author: authorWithMostLikes,
      likes: mostLikesValue
    }
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}