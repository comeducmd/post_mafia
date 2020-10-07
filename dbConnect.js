const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
const url = process.env.MONGO_DB_ATLAS;
const connect = mongoose.connect(
    url,
    { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
    () => {
        console.log("mongodb connected");
    }
);
module.exports = connect;