const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

// view 방법 지정 & 경로 지정
app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");

// statics 경로 지정
app.use(express.static(__dirname + "/statics"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: "mafia",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            // 세션은 여기 저장
            mongooseConnection: mongoose.connection,
            ttl: 60 * 60, // 1시간 후 폭파
        }),
        cookie: {
            maxAge: 1000 * 60 * 2, // 쿠키 세션 ID는 2분 후 폭파
        },
    })
);
// router 경로 지정, 할당
const router = require("./router");
app.use("/", router);

const PORT = process.env.PORT || 4200;
server.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
});

// db 연결
const connect = require("./dbConnect");
// socket 연결
require("./socket")(io);
require("./socket2")(io);