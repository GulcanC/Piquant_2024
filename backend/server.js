console.log('This is my first server js!')

// create un server Node 
// import le package http, for doing this use require key word
const http = require('http');
// after creating a file app.js import it in the file server.js
const app = require('./app')

/* const server = http.createServer((req, res) => {
   res.end('This is the response of server')
}) */

// Now we have to develop our server.js

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
}
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
            default:
                throw error;
        }
}

// On the postman, check it, use the request GET => http://localhost:3000
// coding server web on Node is possible but it is long and heavy
// So it is better to use framework ExpressJS which simplifies the tasks and we can deploy our APIs fast
app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind)
})

server.listen(process.env.PORT || 3000);
