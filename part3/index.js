const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
//To make express show static content, the page index.html and the JavaScript, etc., 
// it fetches, we need a built-in middleware from express called static.
app.use(express.static('build'));

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
    response.json(notes)
});

// :id -> adds it to request parameters
// NOTE: request parameters defaults to a String
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => {
        // returns the note whose id is equal to the requested id
        return note.id === id
    });

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    // filters out the note that matches the reuqested id 
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
});

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

    return maxId + 1;
}

app.post('/api/notes', (request, response) => {
    const body = request.body;

    console.log(body);

    if (!body.content) {
        return response.status(400).json({
            error: 'content is missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
});

app.get('/github', (request, response) => {
    const githubAccount = "https://github.com/eRuaro";
    response.redirect(githubAccount);
});

app.get('/neil', (request, response) => {
    const neilJson = {
        name: "Neil",
        age: "17",
        company: "CertiK",
    }
    response.json(neilJson);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Nodemon: For automatic restart of server when code changes