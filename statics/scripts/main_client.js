const roomEnterBtn = document.querySelector("#roomEnterBtn");
const init = () => {
    roomEnterBtn.addEventListener("click", (event) => {
        const username_input = document.querySelector("#username");
        let username = username_input.value;
        const roomname = document.querySelector("input[name='room']:checked").value;
        const roomID = document.querySelector("input[name='room']:checked").id;
        if (username !== "") {
            // 로컬스토리지에 저장하는것 까지만
            localStorage.setItem("username", username);
            localStorage.setItem("roomname", roomname);

            location.href = `/${roomID}`;
        } else {}
    });
};
init();