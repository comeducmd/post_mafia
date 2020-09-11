const onlineUsers = {};

function disconnectionHandling(socket, io) {
    console.log(`user ${socket.id} out`);
    delete onlineUsers[socket.id];
}

function connectionHandling(socket, io) {
    let loginID = [];
    console.log(`+ connection to socket.io : user ${socket.id} in`);
    console.log(`=> ${io.engine.clientsCount} socket(s) connected`);
    loginID.concat(socket.id);
    socket.on("disconnect", () => disconnectionHandling(socket, io));
    socket.on("roomenter", (data) => {
        const user = data.username;
        const room = data.roomname;
        socket.join(room);
        onlineUsers[socket.id] = { roomId: room, username: user };
        io.sockets.in(room).emit("roomgreet", `${user} joined this room(${room})`);
        io.sockets.in(room).emit("usersList", getUsersByRoomId(room));
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