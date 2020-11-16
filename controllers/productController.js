const fs = require('fs');
let productos = JSON.parse(fs.readFileSync(__dirname + "/../database/products.json"));

const productController = {
    products: function (req,res,next){
        res.render ('products');
    },
    create: function (req,res,next){
        productos.push(req.body);
        let productosJSON = JSON.stringify(productos,null,2);
        fs.writeFileSync(__dirname + "/../database/products.json", productosJSON);
        res.send ("Producto Creado");
    }
}

module.exports = productController;