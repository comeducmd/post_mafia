const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
const url = "mongodb://localhost:27017/mafia";
const connect = mongoose.connect(
    url, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("mongodb connected");
    }
);
module.exports = connect;