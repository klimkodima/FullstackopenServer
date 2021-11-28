const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const options = { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(url, options)

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: [true, 'Name required'], unique: true },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{8,12}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number. It  is requaired from 8 to 12 numbers !`
    },
    required: [true, 'User phone number required']
  }
}, {
  versionKey: false,
  useCreateIndex: true
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)