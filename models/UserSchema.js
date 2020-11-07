const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //socketID: {
    //    type: String,
    //},
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
    // connectedRoom: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "room"
    // },
});

let UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;