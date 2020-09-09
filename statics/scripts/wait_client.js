const socket = io("/");
const rk = document.querySelector("#rk").textContent;
const init = () => {
    const username = localStorage.getItem("username");
    const roomname = localStorage.getItem("roomname");
    const data = { username: username, roomname: roomname };
    socket.emit("username", data);
    //socket.emit("register", localStorage.getItem("socketID"));
    socket.on("userenter", function(data) {
        console.log(data.result);
        if (data.result.name.trim() == rk.trim()) {
            console.log("user entered in this room");
            data.result.members.forEach((element) => {
                const sid = document.getElementById(element.socketID);
                if (sid === undefined || sid === null) {
                    const userList_ul = document.querySelector("div#userList>ul");
                    const li = document.createElement("li");
                    li.id = element.socketID;
                    const litext = document.createTextNode(element.username);
                    li.appendChild(litext);
                    userList_ul.appendChild(li);
                }
            });
        }
    });
};
init();