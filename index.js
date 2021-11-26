require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

const app = express()
app.use(express.static('build'))
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
Person.find({}).then(result => {
    console.log(result)
    result.forEach(person => {
      console.log(person)
    })
})

app.get('/api/people', (request, response) => {
    console.log("connect")
    Person.find({}).then(result => {
        console.log(result)
        result.forEach(person => {
          console.log(person)
        })
        response.json(result)
    })
})

app.get('/info', (request, response) => {
    let info = `<p>Phonebook has info for ${people.length} people</p>
                <p>${new Date}</p>`
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})