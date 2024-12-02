console.log('Server js')

// create un server Node 
// import le package http, for doing this use require key word
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('This is the response of server')
})

server.listen(process.env.PORT || 3000);
// On the postman, check it, use the request GET => http://localhost:3000
// coding server web on Node is possible but it is long and heavy
// So it is better to use framework ExpressJS which simplifies the tasks and we can deploy our APIs fast


