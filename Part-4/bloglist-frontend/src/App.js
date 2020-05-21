import React, { useEffect , useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService
    .getAll()
    .then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog: "${returnedBlog.title}" by "${returnedBlog.author}" added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addVote = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.concat(updatedBlog))
  }

  const handleBlogDelete = async (blog) => {
    const deletedBlog = await blogService.remove(blog)
    const newBlogs = blogs.filter(blog => {
      return blog.id !== deletedBlog.id
    })
    setBlogs(newBlogs)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <Notification message={errorMessage}clas='error'/>
      <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({target}) => setUsername(target.value)}
      handlePasswordChange={({target}) => setPassword(target.value)}
      handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <BlogForm
      createBlog={addBlog}
      />
    </Togglable>
  )

let blogsToShow
if (user === null) {
blogsToShow = null
} else {
  blogs.sort((a, b) => {
    return b.upvotes - a.upvotes
  })
  blogsToShow = blogs.filter(blog => blog.user.username === user.username)

}

const handleLogout = () => {
  setUser(null)
  window.localStorage.removeItem('loggedBlogAppUser')
}

  return (
    <div>
      {user === null ?
       loginForm() :
        <div>
          <h1>Blogs</h1>
          <Notification message={errorMessage}clas='green'/>
          <p>{user.name} logged in <button
          type='submit'
          onClick={() => handleLogout()}>logout</button>
          </p>
          {blogForm()}
          {blogsToShow.map((blog, i) =>
            <Blog
            key={i}
            blog={blog}
            handleUpvote={addVote}
            deleteBlog={handleBlogDelete}
            />
            )}
            </div>
      }
    </div>
  )
}



export default App;
