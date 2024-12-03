const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://GC:GC_2024@clusterGC2024.65ftf.mongodb.net/',

).then(() => console.log('✅ MongoDB connection is successfull!'))
    .catch(() => console.log('MongoDB connection is NOT successfull!'));

app.use(express.json());
// La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
// Error CORS => Cross Origin Resource Sharing, It is a security system which prevent HTTP calls between different servers, it prevents to access the unwanted requests to sensitive resources
// For us we have two origines : localhost:3000 and localhost:4200, these two communicate with each other
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, PATCH, OPTIONS ')
    next()
})

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Object is created!'
    })
})
// add middleware
// next() method comes from middleware, it allows the middleware passes to next middleware. 
// for example here the app Express contains four elements of middleware. 


/*
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

}) */

app.get('/api/stuff', (req, res, next) => {
    const stuff = [

        {
            id: '1',
            title: 'GD'
        },

        {
            id: '2',
            title: 'GT'
        }
    ];
    res.status(200).json(stuff);
})
module.exports = app;
