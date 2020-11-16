var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

/* GET home page. */
router.get('/', productController.products);
router.post('/', productController.create);


module.exports = router;
