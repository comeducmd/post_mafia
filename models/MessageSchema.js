const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    message: {
        type: String,
    },
    sender: {
        type: String, //objectID로 받는게 나을까?
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
    },
}, {
    timestamps: true,
});

let Message = mongoose.model("Message", MessageSchema);
module.exports = Message;