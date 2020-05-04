//const http = require('http')
const express = require('express')
const app = express()

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
  // get base landing page
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
// get all notes
app.get('/api/notes', (req, res) => {
    res.json(notes)
})
// get a single note by id
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => {
    return note.id === id
  })
  if (note) {
    res.json(note)
  } else {
    res.send('<h1>404 Error</h1>')
    res.status(404).end()
  }
})
//delete a single note by id 
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => {
    return notes.id !== id
  })
  res.status(204).end()
})



const PORT = 3004
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})