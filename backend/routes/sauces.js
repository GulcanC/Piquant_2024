const express = require('express')

const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const ctrlSauce = require('../controllers/sauces')

router.post('/', auth, multer, ctrlSauce.createSauce)
module.exports = router