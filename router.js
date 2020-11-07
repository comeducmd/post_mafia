const express = require("express");
const router = express.Router();
const RoomModel = require("./models/RoomSchema");
const UserModel = require("./models/UserSchema");
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
        body: { data },
    } = req;

    const newMsg = MessageModel.create({
        message: data.message,
        roomID: data.roomID,
        sender: data.sender,
    });

    res.send();
});

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

router.get("/:roomID", checkFive, async(req, res) => {
    const prevURL = req.headers.referer;
    const {
        params: { roomID },
    } = req;
    if (prevURL == rootURL) {
        //const newUser = UserModel.create({ // 시작 페이지에서 온 경우 db에 유저를 저장한다.
        //    username: // 이 때 username을 뭐라고 해야할까? 그냥 소켓에서 userCreate이라는 새 url로 넘겨버릴까?
        //})
        //req.session.uid = newUser._id
    } else if (prevURL == `${rootURL}${roomID}/game`) {
        //const uid = req.session.uid; // 게임 페이지에서 넘어온 경우, 세션에 있는 유저 아이디를 활용해 유저를 찾는다.
        //UserModel.findById(uid, ()=>{
        // 이걸 찾아서 다시 소켓에 유저 이름 정보를 저장하면 된다.. 괜찮을까?
        //})
    } else {
        res.redirect("/");
    }

    console.log("Room ID :", roomID);

    try {
        const msg = await MessageModel.find({ roomID: roomID }).sort({
            createdAt: 1,
        });
        res.render("wait.ejs", { roomID, msg });
    } catch (error) {
        res.render("wait.ejs", { roomID, msg: [] });
    }
});

module.exports = router;