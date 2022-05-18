const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require("./util/db");

const notesRouter = require("./controller/notes");

app.use(express.json());

app.use("/api/notes", notesRouter);

const start = async() => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}

start();
