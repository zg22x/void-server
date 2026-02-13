const io = require('socket.io')(3000, {
  cors: { origin: "*" }
});

console.log("Orbi Server started on port 3000...");

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send-message', (data) => {
        io.emit('receive-message', data); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});