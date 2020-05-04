const express = require('express')
const cors = require('cors')
const app = express()

// body parser for parsing the body when posting new notes to server
app.use(express.json())
app.use(cors())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]
// landing page
app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

// get all notes within the DB
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// get a single note by ID
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.send('404 Error')
    res.status(404).end()
  }
})

// delete a single note by ID
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

// add new notes to the server
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  console.log(maxId)
  return maxId +1
}
// add new notes to the server
app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }
  notes = notes.concat(note)
  res.json(note)
})


const PORT = 3001
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})