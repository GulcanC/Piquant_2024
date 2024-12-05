
const jwt = require("jsonwebtoken");
// export a function which will be our middleware
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("🎉🎉🎉TOKEN🎉🎉🎉")
        console.log(req.headers.authorization);

        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
        console.log("🎉🎉🎉decodedToken🎉🎉🎉");
        console.log(decodedToken)

        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
        }
        next()

    } catch (error) {
        res.status(401).json({error})
    }
}