module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('exampleEvent', (data) => {
            console.log(data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
