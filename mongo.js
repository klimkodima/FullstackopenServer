const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
 `mongodb+srv://fullstackopenkd:${password}@cluster0.0kl8e.mongodb.net/people?retryWrites=true&w=majority`
 
const options = { keepAlive: 1, useNewUrlParser: true,useUnifiedTopology: true };
mongoose.connect(url,options)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
},{
    versionKey: false,
    useCreateIndex: true
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model('Person', personSchema)

/*const person = new Person({
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
})
person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
*/

Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
