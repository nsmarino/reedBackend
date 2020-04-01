const mongoose = require('mongoose')

const poemSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true,
  },
  content: [{
      line: String,
      author: String,
  }],
  archived: Boolean,
})

poemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Poem', poemSchema)