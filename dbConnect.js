const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const url = "mongodb://localhost:27017/mafia";
const connect = mongoose.connect(
    url, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("mongodb connected");
    }
);
module.exports = connect;