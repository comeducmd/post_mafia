module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("join-room", (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).broadcast.emit("user-connected", userId);
            socket.on("user-create", (data) => {
                console.log(data);
                const newuser = new UserModel({
                    socketID: data.socketID,
                    username: data.username,
                    job: data.job,
                    isAlive: true,
                });
                newuser.save((err) => {
                    if (err) { console.log(err) } else {
                        console.log(`user ${newuser.username} created`)
                    }
                })
            })
            socket.on("disconnect", () => {
                socket.to(roomId).broadcast.emit("user-disconnected", userId);
                UserModel.findOneAndDelete({ socketID: userId })
            });
        });
    });
};