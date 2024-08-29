module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Example of handling a custom event
        socket.on('exampleEvent', (data) => {
            console.log(data);
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
