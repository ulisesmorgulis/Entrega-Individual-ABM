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
    },
    edit: function (req,res,next){
        let id = req.params.id;
        let productoEncontrado; 
        for(let i=0; i<productos.length; i++){
            if (productos[i].id == id){
                productoEncontrado = productos[i];
                break;
            }
        } 
        if (productoEncontrado){
            return res.render ('edit', {productoEncontrado});
        }else {
            return res.render ('productNotFound');
        }
    },
    update: function (req,res,next){
        let id = req.params.id
        let editProduct = req.body;
        let productosNew = productos.map(function(productoEncontrado){
            if (productoEncontrado.id == id){
                productoEncontrado = {
                    id: req.params.id,
                    ...editProduct
                }
            }
            return productoEncontrado;
        });
        fs.writeFileSync(__dirname + "/../database/products.json", JSON.stringify(productosNew,null,2));
        res.render ('edit', {productoEncontrado: editProduct}); 
    },
    delete: function (req,res,next){
        let id = req.params.id;
        let productoEncontrado; 
        for(let i=0; i<productos.length; i++){
            if (productos[i].id == id){
                productoEncontrado = productos[i];
                break;
            }
        } 
        if (productoEncontrado){
            let productoEliminado = productos.filter(function (productoEncontrado){
                return productoEncontrado.id != id;
            });
            productoEliminadoJSON = JSON.stringify(productoEliminado);
            fs.writeFileSync(__dirname + "/../database/products.json", productoEliminadoJSON);
            res.send("Producto Eliminado");
        } else {
            res.render('productNotFound');
        }
    }
}

module.exports = productController;