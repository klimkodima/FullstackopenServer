if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

const app = express()
app.use(express.static('build'))
app.use(express.json())
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

app.post('/api/person', (request, response, next) => {
  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number
  })
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.get('/api/people', (request, response, next) => {
  Person.find({}).then(result => {
    response.json(result)
  }).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({}).then(people => {
    let info = `<p>Phonebook has info for ${people.length} people</p>
    <p>${new Date}</p>`
    response.send(info)
  }).catch(error => next(error))
})

app.put('/api/person/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { runValidators: true, context: 'query', new: true }).then(result => {
    response.json(result)
  }).catch(error => next(error))
})

app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).send('Not found')
    }
  }).catch(error => next(error))
})

app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})