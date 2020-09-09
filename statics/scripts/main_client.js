const socket = io("/");
const roomEnterBtn = document.querySelector("#roomEnterBtn");
const init = () => {
    roomEnterBtn.addEventListener("click", (event) => {
        const username_input = document.querySelector("#username");
        let username = username_input.value;
        const roomname = document.querySelector("input[name='room']:checked").value;
        if (username !== "") {
            // 데이터 처리
            localStorage.setItem("username", username);
            localStorage.setItem("roomname", roomname);
            // socket.emit('서버로 보낼 이벤트명', 데이터);

            location.href = `/${roomname}`;
        } else {}
    });
    socket.on("welcome", () => {
        console.log("hello user");
    });
};
init();