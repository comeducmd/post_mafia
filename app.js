const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");

// view 방법 지정 & 경로 지정
app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");

// statics 경로 지정
app.use(express.static(__dirname + "/statics"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router 경로 지정, 할당
const router = require("./router");
app.use("/", router);

const PORT = process.env.PORT || 4200;
server.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});

const connect = require("./dbConnect");
// socket 연결
require("./socket")(io);

io.on("connection", socket => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        });
    })
})