const socket = io("/");
const myPeer = new Peer(undefined, {
    host: "/",
    port: "4203",
});
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};
let USER = 0;

navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: true,
    })
    .then((stream) => {
        addVideoStream(myVideo, stream);


        console.log("create new user in db");
        localStorage.setItem("userSocket", myPeer._id);
        const username = localStorage.getItem("username");
        const roomID = localStorage.getItem("roomID")
        const job = null; // 아직 어케 할지 모르겠다.

        let newUserData = {
            'socketID': myPeer._id,
            'username': username,
            'connectedRoom': roomID,
            'job': job,
        };
        let reqCreateUser = $.ajax({
            url: `/createUser`,
            dataType: 'text',
            type: 'POST',
            data: {data:newUserData},
        });

        reqCreateUser.done(() => {
            console.log('success');
        });
        reqCreateUser.fail(() => {
            console.log('error');
        });

        myPeer.on("call", (call) => {
            call.answer(stream);

            const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
                addVideoStream(video, userVideoStream);
            });
        });

        socket.on("user-connected", (userId) => {
            console.log("User connected : " + userId);
            // user 연결 후 기다렸다가 동영상 로드
            setTimeout(() => {
                connectToNewUser(userId, stream);
            }, 1000);
        });
    });

socket.on("user-disconnected", (userId) => {
    console.log("User disconnected : " + userId);
    localStorage.removeItem("userSocket");
    if (peers[userId]) {
        peers[userId].close();
    }
});

myPeer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement("video");

    call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
    });

    call.on("close", () => {
        video.remove();
        USER = USER - 2;
    });

    peers[userId] = call;
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    USER = USER + 1;
    video.id = "video" + USER;
    videoGrid.append(video);
}