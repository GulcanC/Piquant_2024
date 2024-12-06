const express = require('express')

const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const ctrlSauce = require('../controllers/sauces')

// http://localhost:3000/api/sauces
// http://localhost:3000/api/sauces
// http://localhost:3000/api/sauces/:id

router.post('/', auth, multer, ctrlSauce.createSauce);
router.get('/', auth, ctrlSauce.getAllSauces);
router.get('/:id', auth, ctrlSauce.getOneSauce);
router.put('/:id', auth, ctrlSauce.modifySauce);
module.exports = router;