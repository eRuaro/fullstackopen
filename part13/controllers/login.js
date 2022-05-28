const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");
const { response } = require("express");
const { tokenExtractor } = require("../util/middleware");

const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id);
    if (!user.admin) {
        return res.status(401).json({ error: "operation not allowed" })
    }

    next();
}

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })

    if (user) {
        user.disabled = req.body.disabled;
        await user.save();
        res.json(user);
    } else {
        res.status(404).end();
    }
})

router.post("/", async(req, res) => {
    const body = req.body;

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = body.password === "secret";

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password"
        })
    }

    if (user.disabled) {
        return response.status(401).json({
            error: "user is disabled, please contact admin"
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET);

    response.status(200).send({
        token, username: user.username, name: user.name
    })
})

module.exports = router;