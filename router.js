const express = require("express");
const router = express.Router();
const RoomModel = require("./models/RoomSchema");

router.get("/", (req, res) => {
    RoomModel.find({}, (err, rooms) => {
        res.render("index.ejs", { rooms: rooms });
    });
});

router.post("/createRoom", (req, res) => {
    const newRoom = new RoomModel({
        name: req.body.roomName,
        members: [],
    });
    newRoom.save((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});

router.get("/:rk", (req, res) => {
    const {
        params: { rk },
    } = req;
    console.log("room key :", rk);
    res.render("wait.ejs", { room_key: rk });
});

router.get("/:rk/game", (req, res) => {
    const {
        params: { rk },
    } = req;
    res.render("game.html", { room_key: rk });
});

module.exports = router;