

const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user");

// create two routes POST for signup and login, front end sends the user informations

// http://localhost:3000/api/auth/signup


router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
module.exports = router;