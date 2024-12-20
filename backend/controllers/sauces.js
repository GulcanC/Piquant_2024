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

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({error}))

    console.log(('💧💧 Successfull! Get all sauces!'))
    console.log(req.body)
}

exports.getOneSauce = (req, res, next) => {
Sauce.findOne({ _id: req.params.id }).then((sauce) => res.status(200).json(sauce)).catch((error) => res.status(400).json({error}))

console.log('💧💧 Success! Get one sauce!')
console.log(req.params.id)

}

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : {...req.body};

    Sauce.findOne({ _id: req.params.id}).then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(403).json({message: 'Not authorized'});
        }
        else {
            Sauce.updateOne(
                {_id: req.params.id},
                {...sauceObject, _id: req.params.id}
            ).then(() => res.status(200).json({message: 'Object is modified!'}))
            .catch((error) => res.status(401).json({error}));
        }
    }).catch((error) => {
        res.status(400).json({error})
    });
    console.log("💧💧 Success! Sauce is modified!")
    console.log(req.body)
} 