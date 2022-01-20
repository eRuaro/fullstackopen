const { request } = require('express');
const express = require('express');
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

app.get('/github', (request, response) => {
    const githubAccount = "https://github.com/eRuaro";
    response.redirect(githubAccount);
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Nodemon: For automatic restart of server when code changes