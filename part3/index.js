require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
//To make express show static content, the page index.html and the JavaScript, etc., 
// it fetches, we need a built-in middleware from express called static.
app.use(express.static('build'));

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
});

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)

const Note = mongoose.model('Note', noteSchema);

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2020-05-30T17:30:31.098Z",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods",
        date: "2019-05-30T17:30:31.098Z",
        important: true,
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
});

// :id -> adds it to request parameters
// NOTE: request parameters defaults to a String
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    // filters out the note that matches the reuqested id 
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
});

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Nodemon: For automatic restart of server when code changes