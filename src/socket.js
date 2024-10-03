const { Server } = require("socket.io");

let io; // Declare the io variable

const initializeSocket = (server) => {
    io = new Server(server); // Initialize io with the HTTP server

    io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on("disconnect", () => {
            console.log("Client disconnected");
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
