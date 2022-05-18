const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require("./util/db");

const notesRouter = require("./controller/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const start = async() => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}

start();
