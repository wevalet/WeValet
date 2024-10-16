const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ["http://valetapp.wevalet.in", "http://localhost:5173", "https://valetapp.wevalet.in", "https://valetapp.wevalet.in/", "http://65.2.158.253:3500"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("disconnect", (reason) => {
            console.log("Client disconnected", reason);
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initializeSocket, getIO };
