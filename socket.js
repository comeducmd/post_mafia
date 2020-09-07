module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`+ connection to socket.io : user ${socket.id} in`);
        io.emit("welcome");
        socket.on("disconnect", () => {
            console.log(`user ${socket.id} out`);
        });
    });
};