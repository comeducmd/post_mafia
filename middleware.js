const RoomModel = require("./models/RoomSchema");

const checkFive = (req, res, next) => {
    const {
        params: { rk },
    } = req;
    RoomModel.findOne({ name: rk }, (err, room) => {
        if(room === null || room === undefined){
            res.redirect("/");
        }
        else {
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