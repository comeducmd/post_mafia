const init = () => {
    const socket = io.connect("http://localhost:4200");
    const roomEnterBtn = document.querySelector("#roomEnterBtn");
    roomEnterBtn.addEventListener("click", (event) => {});
    socket.on("welcome", () => {
        console.log("hello user");
    });
};
init();
console.log("client.js connected");