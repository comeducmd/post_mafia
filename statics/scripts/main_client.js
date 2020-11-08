const roomEnterBtn = document.querySelector("#roomEnterBtn");
const nameEnterBtn = document.querySelector("#nameEnterBtn");
const nameChangeBtn = document.querySelector("#nameChangeBtn");
const roomInput = document.querySelector(".roomselection");
const nameInput = document.querySelector(".nameinput");
const init = () => {
    if (localStorage.getItem("username") != null && localStorage.getItem("username") !== undefined) {
        nameInput.style.display = "none";
        roomInput.style.display = "block";
        const un = document.querySelector("#un");
        un.innerText = localStorage.getItem("username");
    }
    nameEnterBtn.addEventListener("click", (event) => {
        const username_input = document.querySelector("#username");
        let username = username_input.value;
        if (username !== "") {
            localStorage.setItem("username", username);
            nameInput.style.display = "none";
            roomInput.style.display = "block";
            const un = document.querySelector("#un");
            un.innerText = username;
        } else {}
    })
    nameChangeBtn.addEventListener("click", (event) => {
        localStorage.removeItem("username");
        nameInput.style.display = "block";
        roomInput.style.display = "none";
    })
    roomEnterBtn.addEventListener("click", (event) => {
        //const roomname = document.querySelector("input[name='room']:checked").value;
        const roomID = document.querySelector("input[name='room']:checked").id;
        //if (username !== "") {
        // 로컬스토리지에 저장하는것 까지만
        localStorage.setItem("roomID", roomID);
        location.href = `/${roomID}`;
        //} else {}
    });
};
init();