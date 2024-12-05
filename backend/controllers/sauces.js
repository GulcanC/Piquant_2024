const Sauce = require('../models/sauces');

exports.createSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce)
    // delete _id because it is generated automatically
    delete sauceObject._id;

    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [" "],
        usersdisLiked: [' ']
    });
    // save this object in the data base
    // in app.js add root to menage images

    sauce.save().then(() => res.status(201).json({message: 'Sauce is saved!'})).catch((error) => res.status(400).json({error}))

    console.log("💧💧 suace is created")
    console.log(req.body)

}