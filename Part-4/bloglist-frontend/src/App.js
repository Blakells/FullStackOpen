import React, { useEffect , useState} from 'react';
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setnewBlog] = useState('')
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  // const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setnewBlog('')
      setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
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

  const handleBlogTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleBlogAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleBlogUrl = (event) => {
    setUrl(event.target.value)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <Notification message={errorMessage} clas='error'/>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title:
      <input 
      value={newTitle}
      onChange={handleBlogTitle}
      />
      <br/>
      Author:
      <input 
      value={newAuthor}
      onChange={handleBlogAuthor}
      />
      <br/>
      URL:
      <input 
      value={newUrl}
      onChange={handleBlogUrl}
      />
      <button type='submit'>save</button>
    </form>
  )

let blogsToShow
if (user === null) {
blogsToShow = null
} else {
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
          <p>{user.name} logged in</p>
          {blogForm()}
          <button
          type='submit'
          onClick={() => handleLogout()}>logout</button>
          {blogsToShow.map((blog, i) => 
            <Blog 
            key={i}
            blog={blog}
            />
            )}
            </div>
      }
    </div>
  )
}



export default App;
