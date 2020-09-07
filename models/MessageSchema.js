const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    message: {
        type: String,
    },
    sender: {
        type: String, //objectID로 받는게 나을까?
    },
}, {
    timestamps: true,
});

let Message = mongoose.model("Message", messageSchema);
module.exports = Message;