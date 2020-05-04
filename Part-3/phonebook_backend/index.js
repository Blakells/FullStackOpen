const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
// const header = morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join(' '),
//   res.json()
// })
morgan.token('body', function (req) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time :body'))
// phonebook
let phonebook = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

// root api
app.get('/', (req, res) => {
  res.send('Home')
})

// show entire phonebook
app.get('/api/persons', (req, res) =>{
  res.json(phonebook)
})

// phonebook info page
app.get('/info', (req, res) => {
  const length = phonebook.length
  res.send(`<p>Phonebook has ${length} people</p>` + new Date())
  res.send(new Date())
})

// show single person by id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).send('404 Error')
  }
})

// delete single person by id
app.delete('/api/persons/:id', (req, res) =>{
  const id = Number(req.params.id)
  phonebook = phonebook.filter(p => p.id !== id)
  res.status(204).end()
})

// add single person

const newId = () => {
  let length = phonebook.length
  return Math.max(Math.random() * (1000000000 - length) +1)
}
app.post('/api/persons', (req, res) => {
  const body = req.body

  let findName = phonebook.find(person => person.name == body.name)
  let findNumber = phonebook.find(person => person.number == body.number)

  if (!body.name || !body.number) {
    return res.send('please enter a name and number').status(400)
  }
  if (findName || findNumber){
    res.json({
      error:'Must be a unique name & number'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: newId()
  }
  phonebook = phonebook.concat(person)
  res.json(phonebook)
})

const PORT = process.env.PORT || 3001
app.listen((PORT), () => {
  console.log(`server up on port ${PORT}`)
})