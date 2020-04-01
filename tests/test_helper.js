const Poem = require('../models/poem')

const initialPoems = [
  {
    title: "I",
    content: [{
      line: "The art of losing",
      author: "Elizabeth",
    }],
    archived: false,
  },
  {
    title: "II",
    content: [{
      line: "big ups",
      author: "guy yard",
    }],
    archived: true,
  },
  {
    title: "III",
    content: [{
      line: "back to the shack",
      author: "guy yard",
    }],
    archived: true,
  }
]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon', date: new Date() })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const poemsInDb = async () => {
  const poems = await Poem.find({})
  return poems.map(poem => poem.toJSON())
}

module.exports = {
  initialPoems, poemsInDb
}