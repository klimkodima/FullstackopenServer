const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
     JSON.stringify(req.body)
    ].join(' ')
  }))
app.use(express.json())

let people = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
let info = `<p>Phonebook has info for ${people.length} people</p>
<p>${new Date}</p>`

app.get('/api/people', (request, response) => {
    response.json(people)
})

app.get('/info', (request, response) => {
    response.send(info)
})

app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).send("Not found")
    }
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/person', (request, response) => {
    const person = request.body
    if (!person.name) {
        return response.status(400).json({ error: "Name must not be empty" })
    }
    if (!person.number) {
        return response.status(400).json({ error: "Number must not be empty" })
    }
    if (people.find(p => p.name === person.name)) {
        return response.status(400).json({ error: 'Name must be unique' })
    }
    person.id = Math.floor(Math.random() * 100000)
    people = people.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})