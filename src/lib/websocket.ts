import { io } from "./http";

interface RoomUser {
    socket_id: string;
    username: string;
    room: string;
}

interface Message {
    room: string;
    content: string;
    createdAt: Date;
    username: string;
}

type SocketPayload<T = unknown> = {
    payload: T;
};

const IO = {
    connection: "connection",
};

const SOCKETS = {
    enterRoom: "enter_room",
    sendMessage: "send_message",
};

const inMemoryUsers: RoomUser[] = [];
const inMemoryMessages: Message[] = [];

io.on(IO.connection, (socket) => {
    socket.on(
        SOCKETS.enterRoom,
        (
            data: SocketPayload<Omit<RoomUser, "socket_id">>,
            callback: (messages: Message[]) => void
        ) => {
            const { username, room } = data.payload;

            socket.join(room);

            const userInRoom = inMemoryUsers.find(
                (user) => user.username === username && user.room == room
            );

            if (userInRoom) {
                userInRoom.socket_id = socket.id;
            } else {
                inMemoryUsers.push({
                    room,
                    username,
                    socket_id: socket.id,
                });
            }

            const messagesRoom = getMessagesRoom(room);
            callback(messagesRoom);

            io.to(room).emit(SOCKETS.enterRoom, { username });
        }
    );

    socket.on(SOCKETS.sendMessage, (data: SocketPayload<Message>) => {
        const { content, room, username } = data.payload;

        const message: Message = {
            content,
            room,
            username,
            createdAt: new Date(),
        };

        inMemoryMessages.push(message);

        io.to(room).emit(SOCKETS.sendMessage, message);
    });
});

function getMessagesRoom(room: Message["room"]) {
    const messagesRoom = inMemoryMessages.filter(
        (message) => message.room === room
    );
    return messagesRoom;
}
