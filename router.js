const express = require("express");
const router = express.Router();
const RoomModel = require("./models/RoomSchema");
const MessageModel = require("./models/MessageSchema");
const checkFive = require("./middleware");

const rootURL = "http://localhost:4200/";

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

router.post("/message", (req, res) => {
    const {
        body: { data }
    } = req;

    const newMsg = MessageModel.create({
        message: data.message,
        roomID: data.roomID,
        sender: data.sender
    });

    res.send();
})

router.get("/:roomID/game", (req, res) => {
    const prevURL = req.headers.referer;
    const roomId = req.params.roomID;
    if (prevURL !== `${rootURL}${roomId}`) {
        res.redirect("/");
    } else {
        RoomModel.findOne({ _id: roomId }, (err, room) => {
            room.isRunning = true;
            room.save();
        });
        res.render("game", { roomId });
    }
});

router.get("/:roomID", checkFive, async (req, res) => {
    const prevURL = req.headers.referer;
    if (prevURL !== rootURL) {
        res.redirect("/");
    } else {
        const {
            params: { roomID },
        } = req;
        console.log("Room ID :", roomID);

        try {
            const msg = await MessageModel.find({roomID:roomID}).sort({createdAt:1});
            res.render("wait.ejs", { roomID ,msg });
        } catch (error) {
            res.render("wait.ejs", { roomID ,msg : []});
        }
        
    }
});

module.exports = router;