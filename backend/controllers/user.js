// 4) install bcrypt to hash password
const bcrypt = require("bcrypt");

const User = require("../models/user");

const jwt = require('jsonwebtoken')

// 1) use signup() function to save a new user

exports.signup = (req, res, next) => {
    console.log("🎉🎉🎉USER SIGNUP🎉🎉🎉");
    console.log(req.body)


    // 2) Use regular expressions for password and email
    // For password, 1 uppercase, 1 lowercase, 3 numerics, 1 special character
    let regExPsw = new RegExp(
        /^(?=.*?[A-Z]){1}(?=.*?[a-z]){1}(?=.*?[0-9]){3}(?=.*?[^\w\s]){1}.{6}$/)

    let regExEmail = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)

    let testEmail = regExEmail.test(req.body.email)
    let testPsw = regExPsw.test(req.body.password)

    if (testEmail === false) {
        res.status(401).json({ message: "⛔️ Email is not correct!" })
    }
    if (testPsw === false) {
        res.status(401).json({
            message: "⛔️ The password must contain 1 uppercase, 1 lowercase, 3 numbers and 1 special character!"
        })
    }
    if (testEmail && testPsw === true) {
        // 3) hash password, call the function bcrypt.hash() to encrypte password
        // execute hashage algorithm 10 times to create a secure password
        bcrypt.hash(req.body.password, 10).then((hash) => {

            const user = new User({
                // pass email
                email: req.body.email,
                // pass password
                password: hash

            }
            );

            // use save() method to save user in the data base
            user.save().then(() => res.status(201).json({ message: '✅ User is created and saved' })).catch((error) => res.status(400).json({ error }))

        }

        ).catch((error) => res.status(500).json({ error }))
        // get the hash of the password and save in new user

    }
}

// After finishing signup() method, do login() method. 

exports.login = (req, res, next) => {
    console.log("🎉🎉🎉USER LOGIN🎉🎉🎉");
    console.log(req.body)

    // use findOne() method, it will pass an objcet avec email and its value which was envoyé by client
    User.findOne({ email: req.body.email })
        // if the request passes well 
        .then((user) => {
            if (user === null) {
                res.status(401).json({ massage: "⛔️ User is not found!" })
            }
            // if we can find a user, we have to compare the password in the data base 
            else {
                bcrypt.compare(req.body.password, user.password)
                   .then((valid) => {
                        if (!valid) {
                            res.status(401).json({ message: "⛔️ The password is not correct!" })
                        } else {
                            // if the password is correct, we have userId and token
                            // we install jsonwebtoken packagke to create a token
                            res.status(200).json({
                                userID: user._id,
                                token: jwt.sign(
                                    {userID: user._id},
                                    `${process.env.JWT_KEY_TOKEN}`,
                                    {expiresIn: "12h"}
                                )
                            })
                        }
                    }).catch((error) => {
                        res.status(500).json({ error });
                    })
            }

        }).catch((error) => {
            res.status(500).json({error})
        })
}


