const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("room");

const SOCKETS = {
    enterRoom: "enter_room",
    sendMessage: "send_message",
};

const $messageInput = document.querySelector("#message_input");
const $messages = document.querySelector("#messages");
const $roomName = document.querySelector("#room_name");

$roomName.innerHTML = room;

/**
 * EVENTS
 * ===========
 */

$messageInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const content = event.target.value;

        const payload = {
            room,
            content,
            username,
        };

        socket.emit(SOCKETS.sendMessage, { payload });

        this.value = "";
    }
});

/**
 * FUNCTIONS
 * ========
 */

function initRoom(messages) {
    messages.forEach(createMessage);
}

function createMessage(message) {
    $messages.innerHTML += `
        <div class="message message-${
            message.username === username ? "from" : "to"
        }">
            <span>
                ${message.content} -
                <time>
                    ${dayjs(message.createdAt).format("HH:mm")}
                </time>
            </span>
        </div>
    `;
}

function createGretting(username) {
    $messages.innerHTML += `
        <div class="grettings">
            <span>
                ${username} se juntou a sala -
                <time>
                    ${dayjs().format("DD/MM HH:mm")}
                </time>
            </span>
        </div>
    `;
}

/**
 * SOCKETS
 * ===========
 */

socket.emit(
    SOCKETS.enterRoom,
    {
        payload: {
            username,
            room,
        },
    },
    initRoom
);

socket.on(SOCKETS.enterRoom, ({ username }) => {
    createGretting(username);
});

socket.on(SOCKETS.sendMessage, (message) => {
    createMessage(message);
});
