const socket = io("/");
const rk = document.querySelector("#rk").textContent;

function makeUsersList(members) {
    const userList_ul = document.querySelector("div#userList>ul");

    Object.keys(members).forEach((i) => {
        if (document.querySelector(`#user_${members[i].socketId}`) == null) {
            const li = document.createElement("li");
            li.id = "user_" + members[i].socketId;
            const litext = document.createTextNode(members[i].name);
            li.appendChild(litext);
            userList_ul.appendChild(li);
        }
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
    socket.on("usersList", (userlist) => {
        console.log(userlist);
        makeUsersList(userlist);
    });
    socket.on("userout", (sid) => {
        document.getElementById(`user_${sid}`).remove();
    });
};
init();