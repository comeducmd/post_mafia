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

const MsgLayer = document.querySelector("#MsgLayer");

function addToMsgLayer(message, _class) {
    const p = document.createElement("p");
    p.innerText = message;
    p.className = _class;
    MsgLayer.appendChild(p);
}

const init = () => {
    const startBtn = document.querySelector("#StartBtn");
    const username = localStorage.getItem("username");
    const roomID = localStorage.getItem("roomID");
    const data = { username: username, roomID: roomID };
    socket.emit("roomenter", data);
    socket.on("roomgreet", (data) => {
        console.log(data);
        addToMsgLayer(data, "join");
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
            addToMsgLayer(data, "leave");
        }, 6000);
    });
    const MsgInput = document.querySelector("#MsgInput");
    MsgInput.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
            const message = MsgInput.value;
            socket.emit("messageInput", {
                message,
                roomID,
                username,
            });
            MsgInput.value = "";
            e.preventDefault;
        }
    });
    socket.on("messagePrint", (data) => {
        addToMsgLayer(data, "message");
    });
};
init();