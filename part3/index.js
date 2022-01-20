const { request } = require('express');
const express = require('express');
const nodemon = require('nodemon');
const app = express();

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


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Nodemon: For automatic restart of server when code changes