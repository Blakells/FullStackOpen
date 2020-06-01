import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Divider, Header, Icon, Button, Segment, Form } from 'semantic-ui-react'
import Navigation from './components/Navigation'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserPage'
import User from './components/User'
import useField from './hooks/index'
import { login, fetchUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUsers, addUser } from './reducers/userReducer'

const App = (props) => {
  const fetchBlogs = props.initializeBlogs
  const fetchUsers = props.initializeUsers
  const fetchUser = props.fetchUser

  const username = useField('text')
  const password = useField('password')
  const signupUsername = useField('text')
  const signupPassword = useField('text')
  const name = useField('text')

  useEffect(() => { fetchUser() }, [fetchUser])
  useEffect(() => { fetchBlogs() }, [fetchBlogs])
  useEffect(() => { fetchUsers() }, [fetchUsers])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login({
        username: username.input.value,
        password: password.input.value
      })
      username.reset()
      password.reset()
      props.setNotification({
        message: 'Success!',
      }, 5000)
    } catch (exception) {
      props.setNotification({
        message: 'wrong username or password',
        style: 'error'
      }, 5000)
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      await props.addUser({
        username: signupUsername.input.value,
        password: signupPassword.input.value,
        name: name.input.value
      })
      signupUsername.reset()
      signupPassword.reset()
      name.reset()
      props.setNotification({
        message: 'Success! Please go to the login form and login!',
      }, 5000)
    } catch (error) {
      props.setNotification({
        message: 'please try again',
        style: 'error'
      }, 5000)
    }

  }

  const signupForm = () => (
    <Segment>
      <Form onSubmit={handleSignup}>
        <Form.Field>
          <label>username</label>
          <input id='signup-username' {...signupUsername.input} />
        </Form.Field>
        <Form.Field>
          <label>name</label>
          <input id='name' {...name.input} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input id='signup-password' {...signupPassword.input} />
        </Form.Field>
        <Button primary type="submit">signup</Button>
      </Form>
    </Segment>
  )

  const loginForm = () => (
    <Segment>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input id='username' {...username.input} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input id='password' {...password.input} />
        </Form.Field>
        <Button primary type="submit">login</Button>
      </Form>
    </Segment>
  )

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === id)

  const userById = (id) =>
    props.users.find(user => user.id === id)

  return (
    <Container>
      <div>
      </div>
      {
        props.loggedUser === null ? 
        <div>
                <h2>Welcome to my Blog Application!</h2>
        <h4>If you already have a profile, please log in! If you are new, please signup to create your profile, and then log in!</h4>
        <Notification />
        <Togglable buttonLabel='Sign Up'>
        {signupForm()}
      </Togglable>
          <Togglable buttonLabel='Log In'>
          {loginForm()}
        </Togglable>
        </div> :
          <Router>
            <Navigation />
            <Header as='h1'>
              <Icon name='newspaper outline'/>
              <Header.Content>blog app</Header.Content>
            </Header>
            <Notification />
            <Divider />
            <Route exact path='/' render={() =>
              <div>
                <Segment>
                  <Togglable buttonLabel='create a new blog'>
                    <BlogForm />
                  </Togglable>
                </Segment>
                <BlogList />
              </div>
            } />
            <Route exact path='/users' render={() => <UserList /> } />
            <Route path='/users/:id' render={({ match }) => 
              <User user={userById(match.params.id)} />
            } />
            <Route path='/blogs/:id' render={({ match }) => 
              <Blog blog={blogById(match.params.id)} />
            } />
          </Router>
      }
    </Container>
  )
}

const sortedBlogs = ({ blogs }) => {
  return blogs.sort((b1, b2) => b2.upvotes - b1.upvotes)
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    blogs: sortedBlogs(state),
    users: state.users
  }
}

const mapDispatchToProps = {
  fetchUser,
  login,
  initializeBlogs,
  initializeUsers,
  setNotification,
  addUser
}

App.propTypes = {
  loggedUser: PropTypes.object,
  fetchUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func.isRequired,
  blogs: PropTypes.array,
  users: PropTypes.array,
  setNotification: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)