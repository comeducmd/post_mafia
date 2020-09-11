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
    socket.emit("roomenter", data);
    socket.on("roomgreet", (data) => {
        console.log(data);
    });
    socket.on("usersList", (data) => {
        console.log(data);
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