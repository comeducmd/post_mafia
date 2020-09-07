/*
const MongoClient = require("mongodb").MongoClient;
const MongoURL = "mongodb://127.0.0.1:27017/";

MongoClient.connect(MongoURL, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    console.log("connected to MongoDB");

    // db 상수 선언하기
    const mafia = db.db("mafia");
    const users = mafia.collection("users");
    const messages = mafia.collection("messages");
    const rooms = mafia.collection("rooms");
});
*/
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

// view 방법 지정 & 경로 지정
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
// statics 경로 지정
app.use(express.static(__dirname + "/statics"));
// router 경로 지정, 할당
const router = require("./router");
app.use("/", router);

const PORT = process.env.PORT || 4200;
server.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});

// socket 연결
require("./socket")(io);
/*
io.on("connection", (socket) => {
    console.log(`+ connection to socket.io : user ${socket.id} in`);
    io.emit("welcome");
    socket.on("disconnect", () => {
        console.log(`user ${socket.id} out`);
    });
});
*/