const express = require("express");
const router = express.Router();
const RoomModel = require("./models/RoomSchema");
const checkFive = require("./middleware");

router.get("/", (req, res) => {
    RoomModel.find({}, (err, rooms) => {
        res.render("index.ejs", { rooms: rooms });
    });
});

router.post("/createRoom", (req, res) => {
    const newRoom = new RoomModel({
        name: req.body.roomName,
        members: 0,
    });
    newRoom.save((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});

router.get("/:roomID/game", (req, res) => {
    res.render("game", { roomId: req.params.room });
});

router.get("/:roomID", checkFive, (req, res) => {
    const {
        params: { roomID },
    } = req;
    console.log("Room ID :", roomID);
    res.render("wait.ejs", { roomID });
    console.log(roomID);
});

module.exports = router;