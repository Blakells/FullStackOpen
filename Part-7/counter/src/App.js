import React, {useState} from 'react';
import {Route, Switch, Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>Blake's Notes App</h2>
    </div>
  )
}

const Note = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Link to={}>{note.content}</Link>
          </li>)}
      </ul>
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


  const padding = {
    padding: 5
  }

  return (
    <div>
    <div>
      <Link style={padding} to='/'>home</Link>
      <Link style={padding} to='/notes'>notes</Link>
      <Link style={padding} to='/users'>users</Link>
    </div>
    <Switch>
      <Route path='/notes'>
        <Notes />
      </Route>
      <Route path='/users'>
        <Users/>
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
    </div>

  )
}


export default App;
