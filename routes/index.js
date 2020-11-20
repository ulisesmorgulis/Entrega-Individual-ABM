var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

/* Crear productos */
router.get('/', productController.products);
router.post('/', productController.create);

/* Editar productos */
router.get('/edit/:id', productController.edit);
router.post('/edit/:id', productController.update);

/* Borrar productos */
router.get('/delete/:id', productController.delete);

module.exports = router;
