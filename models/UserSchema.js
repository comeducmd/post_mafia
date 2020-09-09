const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    socket: {
        type: Object,
    },
    username: {
        type: String,
    },
    job: {
        type: String,
        default: null,
    },
    isHost: {
        type: Boolean,
    },
});

let User = mongoose.model("User", UserSchema);
module.exports = User;