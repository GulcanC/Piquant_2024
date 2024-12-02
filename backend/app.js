const express = require('express');
const app = express();

// add middleware
// next() method comes from middleware, it allows the middleware passes to next middleware. 
// for example here the app Express contains four elements of middleware. 

// The first one
app.use((req, res, next) => {
    console.log('middleware request is got');
    next();
})

// The second one
app.use((req, res, next) => {
    res.status(201);
    next();
})

// The third one
app.use((req, res) => {
    res.json( {message : 'We got your request!'})
    next();
});

//  The fourth one, is last element of the middleware save
app.use((req, res) => {
    console.log('response is send with success!')

})
module.exports = app;
