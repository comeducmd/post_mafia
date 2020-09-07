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

let RoomModel = mongoose.model("room", RoomSchema);
module.exports = RoomModel;