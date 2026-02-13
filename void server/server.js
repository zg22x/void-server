const port = process.env.PORT || 3000;
const io = require('socket.io')(port, {
    cors: { origin: "*" } // يسمح لتطبيق Void بالاتصال من أي مكان
});

console.log(`Void Server is Live on port ${port}`);

io.on('connection', (socket) => {
    console.log('User connected to Void');

    // استقبال الرسائل وتوزيعها
    socket.on('send-message', (data) => {
        // نرسل الرسالة للكل (بما فيهم المرسل لتأكيد الوصول)
        io.emit('receive-message', {
            user: data.user,
            content: data.content,
            time: new Date().toLocaleTimeString()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from Void');
    });
});