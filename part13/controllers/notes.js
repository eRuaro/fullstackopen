const router = require("express").Router();

const { Note, User } = require("../models");
const { Op, where } = require("sequelize");

const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(req.params.id);
    next();
}

router.get("/", async (req, res) => {
    let important = {
        [Op.in]: [true, false]
    }

    if (req.query.important) {
        important = req.query.important === "true";
    }

    if (req.query.search) {
        where.content = {
            [Op.substring]: req.query.search
        }
    }

    const notes = await Note.findall({
        attributes: {
            exclude: ["userId"]
        },
        include: {
            model: User, 
            attributes: ["name"]
        },
        where
    });

    res.json(notes);
})

router.post("/", async (req, res) => {
    try {
       const user = await User.findByPk(req.decodedToken.id);
       const note = await Note.create({...req.body, userId: user.id, date: new Date() });
        res.json(note);
    } catch (err) {
        return res.status(400).json({ error });
    }
})

router.get("/:id", noteFinder, async (req, res) => {
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
})

router.delete("/:id", noteFinder, async (req, res) => {
    if (note) {
        await note.destroy();
    }

    res.status(204).end();
})

router.put("/:id", noteFinder, async (req, res) => {
    if (note) {
        note.important = req.body.important;
        await note.save();
        res.json(note);
    } else {
        res.status(404).end();
    }
})

module.exports = router;