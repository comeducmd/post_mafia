const socket = io("/");
const rk = document.querySelector("#rk").textContent;

function makeUsersList(members) {
    const userList_ul = document.querySelector("div#userList>ul");
    while (userList_ul.hasChildNodes()) {
        userList_ul.removeChild(userList_ul.firstChild);
    }
    members.forEach((element) => {
        const li = document.createElement("li");
        li.id = element.socketID;
        const litext = document.createTextNode(element.username);
        li.appendChild(litext);
        userList_ul.appendChild(li);
    });
}

const init = () => {
    const username = localStorage.getItem("username");
    const roomname = localStorage.getItem("roomname");
    const data = { username: username, roomname: roomname };
    socket.emit("username", data);
    //socket.emit("register", localStorage.getItem("socketID"));
    socket.on("welcome", () => {
        console.log("hello user");
    });
    socket.on("userenter", function(data) {
        if (data.result.name.trim() == rk.trim()) {
            console.log("user entered in this room");
            makeUsersList(data.result.members);
        }
    });
    socket.on("userout", function(data) {
        console.log(data);
        if (data.room.name.trim() == rk.trim()) {
            console.log("user leaved this room");
            makeUsersList(data.room.members);
        }
    });
};
init();