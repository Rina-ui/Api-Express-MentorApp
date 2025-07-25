import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if(error.syscall !== 'listen') {
        throw error;
    };
    const address = Server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    switch (error.code) {
        case 'EACCES' :
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE' :
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
};

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection',(socket) => {
    console.log('A user connected:', socket.id);

    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log(`Listening on ${bind}`);
});

server.listen(port);