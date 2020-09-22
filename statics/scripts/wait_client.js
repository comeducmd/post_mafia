const socket = io("/");
const roomID = document.querySelector("#roomID").textContent;

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
    const startBtn = document.querySelector("#StartBtn");
    const MsgLayer = document.querySelector("#MsgLayer");
    const username = localStorage.getItem("username");
    const roomID = localStorage.getItem("roomID");
    const data = { username: username, roomID: roomID };
    socket.emit("roomenter", data);
    socket.on("roomgreet", (data) => {
        console.log(data);
        const p = document.createElement("p");
        p.innerText = data;
        MsgLayer.appendChild(p);
    });
    socket.on("usersList", (userlist) => {
        console.log(userlist);
        makeUsersList(userlist);
        if (userlist.length === 5) {
            startBtn.disabled = false;
        }
    });
    socket.on("userout", (sid) => {
        document.getElementById(`user_${sid}`).remove();
        startBtn.disabled = true;
    });
    socket.on("roombye", (data) => {
        setTimeout(() => {
            const p = document.createElement("p");
            p.innerText = data;
            p.style.color = "red";
            MsgLayer.appendChild(p);
        }, 6000);
    });
};
init();