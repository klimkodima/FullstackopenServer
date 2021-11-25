const express = require('express')
const app = express()

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
    const human = people.find(human => human.id === id)
    if (human) {
        response.json(human)
      } else {
        response.status(404).send( "Not found")
      }
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(human => human.id !== id)
    response.status(204).end()
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})