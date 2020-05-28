import React, {useState} from 'react';
import {Route, Switch, Link, useRouteMatch, useHistory, Redirect} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>Blake's Notes App</h2>
    </div>
  )
}

const Note = ({note})=> {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : '' }</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => {
  return (
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
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <p>User 1</p>
      <p>User 2</p>
    </div>
  )
}

const Login = (props) => {
  const history = useHistory()
  let e = ''
  const handleSubmit = (event) => {
    event.preventDefault()
    props.onLogin(e)
    history.push('/')
  }
const handleChange = (event) => {
  e = event.target.value
}
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username : <input id='user' onChange={handleChange}/>
        </div>
        <div>
          password : <input type='password'/>
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

  let match = useRouteMatch('/notes/:id')
  const note = match ? notes.find(note => note.id === Number(match.params.id)) : null

  const [user,setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
    <div>
      <Link style={padding} to='/'>home</Link>
      <Link style={padding} to='/notes'>notes</Link>
      <Link style={padding} to='/users'>users</Link>
      {user ? <h4>{user} logged in</h4> : <Link to='/login'>login</Link>}
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
        <Home />
      </Route>
    </Switch>
    </div>

  )
}


export default App;
