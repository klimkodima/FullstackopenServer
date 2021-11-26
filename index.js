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

app.get('/api/people', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/info', (request, response) => {
    let info = `<p>Phonebook has info for ${people.length} people</p>
                <p>${new Date}</p>`
    response.send(info)
})

app.get('/api/people/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>{
        if (person) {
            response.json(person)
        } else {
            response.status(404).send("Not found")
        }
    })
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
    if (false) {
        return response.status(400).json({ error: 'Name must be unique' })
    }
    const newPerson = new Person({
        name:person.name,
        number:person.number
    }) 
    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
      })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})