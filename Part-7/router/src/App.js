import React, {useState} from 'react';
import {BrowserRouter as Router,
  Switch, 
  Route, 
  Link,
  Redirect,
  useRouteMatch,
  useHistory
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Blake's Notes App</h2>
    <p>Lorem Ipsum something something something...</p>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note => 
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>)}
    </ul>
  </div>
)

const Users = () => (
  <div>
    <h2>Blake's notes app</h2>
    <ul>
      <li>Sample User 1</li>
      <li>Sample User 2</li>
      <li>Sample User 3</li>
    </ul>
  </div>
)

const Login = (props) => {
  const history = useHistory()
  let info = ''
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin(info)
    history.push('/')
    info = ''
  }

  const onChange = (event) => {
    event.preventDefault()
     info = event.target.value
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input name='login' onChange={onChange}/>
        </div>
        <div>
          password: <input type='password'/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

const App = () => {

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null) 

  const login = (user) => {
    setUser(user)
  }

  const match = useRouteMatch('/notes/:id')
  const note = match ? notes.find(note => note.id === Number(match.params.id)) : null

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
      <Link style={padding} to='/'>home</Link>
      <Link style={padding} to='/notes'>notes</Link>
      <Link style={padding} to='/users'>users</Link>
      {user ? <div><em>{user} logged in</em></div>
      : <Link style={padding} to='/login'>login</Link>  
    }
      </div>

      <Switch>
        <Route path='/notes/:id'>
          <Note note={note}/>
        </Route>
        <Route path='/notes'>
          <Notes notes={notes}/>
        </Route>
        <Route path='/users'>
          {user ? <Users /> : <Redirect to='/login'/>}
        </Route>
        <Route path='/login'>
          <Login onLogin={login}/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>

      <div>
        <i>Note App, Created by Blake Bailey</i>
      </div>
    </Router>
  )

}


export default App;
