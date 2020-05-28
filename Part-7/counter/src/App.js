import React, {useState} from 'react';
import {Route, Switch, Link, useRouteMatch, useHistory, Redirect} from 'react-router-dom'
import {Container, TableContainer, Table, TableBody,TableCell,TableRow,Paper, TextField, Button, AppBar, Toolbar, IconButton} from '@material-ui/core'
import {Alert} from '@material-ui/lab'


const Home = () => {
  return (
    <div>
      <h2>Blake's Notes App</h2>
      <p>Please Log In to View/Create Notes!</p>
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

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>
                  {note.user}
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </TableContainer>
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
          <TextField label='username'  onChange={handleChange}/>
        </div>
        <div>
          <TextField label='password' type='password'/>
        </div>
        <Button variant='contained' color='primary' type='submit'>login</Button>
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
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const padding = {
    padding: 5
  }

  return (
    <Container>
      {(message &&
    <Alert severity="success">
      {message}
    </Alert>
  )}
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
          <Button color='inherit' component={Link} to='/'>
            home
          </Button>
          <Button color='inherit' component={Link} to='/notes'>
            notes
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
          {user
      ? <em>{user} logged in</em>
      : <Button color="inherit" component={Link} to="/login">
          login
        </Button>
    }
        </Toolbar>
      </AppBar>
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
    </Container>

  )
}


export default App;
