const onlineUsers = {};
const RoomModel = require("./models/RoomSchema");

function disconnectionHandling(socket, io) {
    if (onlineUsers[socket.id] !== null && onlineUsers[socket.id] !== undefined) {
        console.log(`user ${socket.id} out`);
        const leftroom = onlineUsers[socket.id].roomId;
        const leftuser = onlineUsers[socket.id].username;
        delete onlineUsers[socket.id];
        io.sockets.in(leftroom).emit("roombye", `${leftuser} leaved this room`);
        io.sockets.in(leftroom).emit("userout", socket.id);
        // room의 인원 감소시키기
        RoomModel.findOne({ name: leftroom }, (err, r) => {
            if (r === null || r === undefined) {} else {
                const mems = r.members;
                r.members = mems - 1;
                r.save();
            }
        });
    }
}

function connectionHandling(socket, io) {
    let loginID = [];
    console.log(`+ connection to socket.io : user ${socket.id} in`);
    console.log(`=> ${io.engine.clientsCount} socket(s) connected`);
    loginID.concat(socket.id);
    //첫 페이지에 접속한 유저에게 방 정보를 보내자
    socket.on("disconnect", () => disconnectionHandling(socket, io));
    socket.on("roomenter", (data) => {
        const user = data.username;
        const roomID = data.roomID;
        socket.join(roomID);
        // room의 인원 증가시키기
        RoomModel.findOne({ _id: roomID }, (err, r) => {
            const mems = r.members;
            r.members = mems + 1;
            r.save();
        });
        onlineUsers[socket.id] = { roomId: roomID, username: user };
        io.sockets.in(roomID).emit("roomgreet", `${user} joined this room`);
        io.sockets.in(roomID).emit("usersList", getUsersByRoomId(roomID));
    });
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        connectionHandling(socket, io);
    });
};

const getUsersByRoomId = (roomId) => {
    let userstemp = [];
    Object.keys(onlineUsers).forEach((sid) => {
        if (onlineUsers[sid].roomId === roomId) {
            userstemp.push({
                socketId: sid,
                name: onlineUsers[sid].username,
            });
        }
    });
    return userstemp;
};