const UserModel = require("./models/UserSchema");
const RoomModel = require("./models/RoomSchema");

function disconnectionHandling(socket) {
    console.log(`user ${socket.id} out`);
    socket.emit("userout", socket.id);
    /* 이거로 뭐라도 해보려고 했는데.. 일단 쟁여놓기
                        const Indx1 = loginID.indexOf(socket.id);
                        loginID.splice(Indx1, 1);
                        setTimeout(() => {
                            const Indx2 = loginID.indexOf(socket.id);
                            if (Indx2 == -1) {
                                console.log(`user ${socket.id} out`);
                                socket.emit("userout", socket.id);
                            }
                        }, 1000);
                        */
}

function connectionHandling(socket, io) {
    let loginID = [];
    console.log(`+ connection to socket.io : user ${socket.id} in`);
    console.log(`=> ${io.engine.clientsCount} socket(s) connected`);
    loginID.concat(socket.id);
    io.emit("welcome");
    // disconnect 시 딜레이 처리 => 일단 실패
    socket.on("disconnect", () => disconnectionHandling(socket));
    // 유저이름, 방번호 받고 데이터 만들어준다.
    socket.on("username", (data) => {
        console.log("data ", data);
        const username = data.username;
        const roomname = data.roomname;
        console.log(username);
        const newUser = new UserModel({
            username: username,
            socketID: socket.id,
        });
        newUser.save((err) => {
            RoomModel.findOne({ name: roomname }, (err, result) => {
                console.log("result", result);
                if (err) throw err;
                else if (roomname == null) {
                    console.log("no room named ", roomname);
                } else {
                    const lastMembers = result.members;
                    if (lastMembers.length == 0) {
                        newUser.isHost = true;
                        newUser.save();
                    }
                    const currentMembers = lastMembers.concat(newUser);
                    result.members = currentMembers;
                    result.save();
                    console.log("Room updated", result);
                    // 유저가 엔터했다고 정보를 준다.
                    io.emit("userenter", { result });
                }
            });
        });
    });
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        connectionHandling(socket, io);
    });
};