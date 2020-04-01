const poemsRouter = require('express').Router()
const Poem = require('../models/poem')

// GET ALL
poemsRouter.get('/', async (request, response) => {
  // code if i want to only get archived poems
  // if (Object.keys(request.query).length !== 0) {  
  //   console.log(request.query)
  //   const poems = await Poem.find(request.query)
  //   response.json(poems.map(poem => poem.toJSON()))
  // } else {
    const poems = await Poem.find({})
    response.json(poems.map(poem => poem.toJSON()))
  // }
})

// GET ONE
// poemsRouter.get('/:id', async (request, response, next) => {
//   try {
//     const poem = await Poem.findById(request.params.id)
//     if (poem) {
//       response.json(poem.toJSON())
//     } else {
//       response.status(404).end()
//     }
//   } catch (exception) {
//     next(exception)
//   }
// })

// POST NEW POEM
poemsRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {    
    const poem = new Poem({
      title: body.title,
      content: body.content,
      archived: body.archived,
    })
    const savedPoem = await poem.save()
    response.json(savedPoem.toJSON())
  } catch(exception) {
    next(exception)
  }
})

// DELETE POEM
poemsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Poem.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

// UPDATE POEM
poemsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const poem = {
    title: body.title,
    content: body.content,
    archived: body.archived,
  }

  Poem.findByIdAndUpdate(request.params.id, poem, { new: true })
    .then(updatedPoem => {
      response.json(updatedPoem.toJSON())
    })
    .catch(error => next(error))
})

module.exports = poemsRouter