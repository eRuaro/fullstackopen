require("dotenv").config();
const { Sequelize, QueryTypes, DataTypes, Model } = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
});

class Note extends Model {};

Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    important: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note"
});

// creates table automatically if it doesnt already exist
Note.sync();

app.get("/api/notes", async (req, res) => {
    const notes = await Note.findAll();
    res.json(notes);
});

app.post("/api/notes", async (req, res) => {
    console.log(req.body);
    try {
        const note = await Note.create(req.body);
        res.json(note);
    } catch(error) {
        return res.status(400).json({ error });
    }
    
})

app.get("/api/notes/:id", async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    if (note) {
        console.log(note.toJSON());
        res.json(note);
    } else {
        res.status(404).end();
    }
});

app.put("/api/notes/:id", async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    if (noet) {
        note.important = req.body.important;
        await note.save();
        res.json(note);
    } else {
        res.status(404).end();
    }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})