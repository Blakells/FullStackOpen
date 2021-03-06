import React, {useState, useEffect} from 'react'
import axios from 'axios'


const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios
    .get(url)
    .then(res => {
      setNotes(res.data)
    })
  }, [url])
  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])
  const url = 'https://blooming-atoll-75500.herokuapp.com/api/notes'
  const notes = useNotes(url)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>
      <div>{notes.length} notes on server</div>
      <div>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </div>
    </div>
  )
}



export default App