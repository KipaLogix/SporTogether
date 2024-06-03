const { createMessageWebSocket } = require('../controllers/MessageController');

const handleDisconnectEvent = () => {
    console.log("user disconnected")
};

const handleJoinEvent = (socket, roomName) => {
    console.log("join: " + roomName);
    socket.join(roomName);
};

const handleLeaveEvent = (socket, roomName) => {
    console.log("leave: " + roomName);
    socket.leave(roomName);
};

const handleNewMessageEvent = (socket, {message, roomName}) => {
    console.log("message: " + message + " in " + roomName);
    try {
        createMessageWebSocket(message)
        .then((addedMessage) => {
            console.log(addedMessage);
            socket.to(roomName).emit("broadcast", addedMessage);
        });

    } catch (e) {
        console.log(e);
    }
};

const handleErrorEvent = (socket, err) => {
    console.log("problem")
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
};


const handleNewConnection = (socket) => {

    socket.on('disconnect', () => handleDisconnectEvent());

    socket.on('join', roomName => handleJoinEvent(socket, roomName));

    socket.on('leave', roomName => handleLeaveEvent(socket, roomName));

    socket.on('message', data => handleNewMessageEvent(socket, data));

    socket.on("error", err => handleErrorEvent(socket,err));
}

module.exports = handleNewConnection;
