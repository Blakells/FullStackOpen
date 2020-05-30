import React, { useEffect} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserPage from './components/UserPage'
import { addBlog, initializeBlogs, addBlogVote, deleteBlog, showAllBlogs } from './reducers/blogReducer'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch} from 'react-router-dom'
import { tryLogin, tryTokenLogin, logout} from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notifications)
  const user = useSelector(state => state.login)
  const users = useSelector(state => state.users)


  useEffect(() => {
    dispatch(tryTokenLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = (event) => {
    event.preventDefault()    
    let username = event.target.username.value
    let password = event.target.password.value
    dispatch(tryLogin({username, password}))
  }

  const addVote = (blogObject) => {
    dispatch(addBlogVote(blogObject))
  }

  const handleBlogDelete = (blog) => {
    dispatch(deleteBlog(blog))
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
      handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const handleBlogCreate = (blog) => {
    dispatch(addBlog(blog))
  }


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
  dispatch(logout())
}

  const padding = {
  paddingRight: 5
}

// const match = useRouteMatch('/users/:id')
// const findUser = match ? users.find(user => user.id === match.params.id) : null


  return (
    <div>
      <Notification message={notification.text}clas='green'/>
      <Router>
        <div>
        <Link to='/users' style={padding}>users</Link>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/login' style={padding}>login</Link>
        </div>
        <h1>Blogs</h1>

        <Switch>
          <Route path='/login'>
            {user === null ? loginForm() : <Redirect to='/' />}
          </Route>
          <Route path='/users'>
          {user ? <div>{user.name} logged in <button 
            type='submit'
            onClick={() => handleLogout()}>
              logout
              </button></div> : ''}
            <UserPage />
          </Route>
          <Route path='/'>
            {user ? <div>{user.name} logged in 
            <button 
            type='submit'
            onClick={() => handleLogout()}>
              logout
              </button>
              {blogsToShow.map((blog, i) =>
            <Blog
            key={i}
            blog={blog}
            handleUpvote={addVote}
            deleteBlog={handleBlogDelete}
            />
            )}
              </div> :
              ''}
          </Route>
        </Switch>
      </Router>
      {/* {user === null ?
       loginForm() :
        <div>
          <h1>Blogs</h1>
          <p>{user.name} logged in <button
          type='submit'
          onClick={() => handleLogout()}>logout</button>
          </p>
          <BlogForm addBlog={handleBlogCreate}/>
          {blogsToShow.map((blog, i) =>
            <Blog
            key={i}
            blog={blog}
            handleUpvote={addVote}
            deleteBlog={handleBlogDelete}
            />
            )}
            </div>
      } */}
    </div>
  )
}



export default App;
