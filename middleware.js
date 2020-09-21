const RoomModel = require("./models/RoomSchema");

const checkFive = (req, res, next) => {
    const {
        params: { roomID },
    } = req;
    console.log(roomID);
    RoomModel.findOne({ _id: roomID }, (err, room) => {
        if (room === null || room === undefined) {
            console.log(roomID);
            res.redirect("/");
        } else {
            const roommb = room.members;
            if (roommb < 5) {
                next();
            } else {
                res.redirect("/");
            }
        }
    });
};

module.exports = checkFive;