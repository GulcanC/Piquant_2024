const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({path: './vars/.env'})

// security
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const morgan = require('morgan');

const routeUser = require('./routes/user')
const routeSauce = require('./routes/sauces')

// mongoose.connect('mongodb+srv://GC:GC_2024@clusterGC2024.65ftf.mongodb.net/',
mongoose.connect(`mongodb+srv://${process.env.DB_USR_NAME}:${process.env.DB_PSW}@${process.env.DB_CLUSTER}.65ftf.mongodb.net/`)

.then(() => console.log('✅ MongoDB connection is successfull!'))
    .catch(() => console.log('⛔️ MongoDB connection is NOT successfull!'));

app.use(express.json());
// La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
// Error CORS => Cross Origin Resource Sharing, It is a security system which prevent HTTP calls between different servers, it prevents to access the unwanted requests to sensitive resources
// For us we have two origines : localhost:3000 and localhost:4200, these two communicate with each other
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*", "http://localhost:3000/api/auth/signup", "http://localhost:4200/"); // tout le monde peut se connecter a notre API
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization" // On donne l'autorisation d'utiliser certains headers sur l'objet requête
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ); // On donne l'autorisation d'utiliser certains methodes sur l'objet requête; get post put delete patch
    next(); // permet de passer à la lecture des autres middlewares
  });

app.use(bodyParser.json()); // transformer le corps, body en JSON object JS
app.use(mongoSanitize()); // It sanitizes inputs against query selector injection attacks
app.use(hpp()); // hpp moiddleware to protect against HTTP parameter pollution attacks
app.use(morgan('combined'));

// http://localhost:3000/api/auth/login
// http://localhost:3000/api/auth/signup

// http://localhost:3000/api/sauces

app.use('/api/auth', routeUser);
app.use('/api/sauces', routeSauce)

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;









