import { Server } from "socket.io";

const io = new Server(8000, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    socket.on("message", (message) => {
        socket.broadcast.emit("message", message);
    });
});
