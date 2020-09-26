const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
    name: {
        type: String,
    },
    members: {
        type: Number,
        default: 0,
    },
    isRunning: {
        type: Boolean,
        default: false,
    }
});

let RoomModel = mongoose.model("room", RoomSchema);
module.exports = RoomModel;