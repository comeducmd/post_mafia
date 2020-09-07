const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
    name: {
        type: String,
    },
    members: {
        type: Array,
    },
});

let Room = mongoose.model("room", roomSchema);
module.exports = Room;