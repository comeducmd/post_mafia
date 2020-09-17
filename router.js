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

router.get("/:rk", checkFive, (req, res) => {
    const {
        params: { rk },
    } = req;
    console.log("room key :", rk);
    res.render("wait.ejs", { room_key: rk });
});

module.exports = router;