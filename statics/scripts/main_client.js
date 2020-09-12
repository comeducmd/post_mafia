const socket = io("/");
const roomEnterBtn = document.querySelector("#roomEnterBtn");
const init = () => {
    roomEnterBtn.addEventListener("click", (event) => {
        const username_input = document.querySelector("#username");
        let username = username_input.value;
        const roomname = document.querySelector("input[name='room']:checked").value;
        if (username !== "") {
            // 로컬스토리지에 저장하는것 까지만
            localStorage.setItem("username", username);
            localStorage.setItem("roomname", roomname);

            location.href = `/${roomname}`;
        } else {}
    });
    // 여기 방 인원을 출력하는 이벤트를 받는 함수를 만들자.
};
init();