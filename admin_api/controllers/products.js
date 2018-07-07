const ProductsService = require("../sevices/products");
let  util = require("util");

class ProductsController {

    static getProducts() {
        return async (req, res) => {
            const products = await ProductsService.getProducts(req.query.page);

            return res.status(200).send({
                products: products
            });
        }
    }

    static getProductById() {
        return async (req, res) => {
           let product = await ProductsService.getProductById(req.query.id);

            return res.status(200).send({
                product: product
            });
        }
    }

    static createProduct() {
        return async (req, res) => {
            let flag = await ProductsService.isAlreadyExists(req.body.product_name)

            if(!flag.length) {
                await ProductsService.createProduct(req.body);

                return res.status(200).send({ message: "Product created!" });
            } else {
                return res.status(200).send({ message: "Product is alredy exist!" });
            }
        }
    }

    static deleteProduct() {
        return async (req, res) => {
            console.log(req.body);
            await ProductsService.deleteProduct(req.body.product_id);

            return res.status(200).send({
                message: "Product is delete!"
            });
        }
    }

    static updateProduct() {
        return async (req, res) => {
            
            await ProductsService.updateStadium(req.query);

            return res.status(200).send({ message: "Product is update!" });
        }
    }

    static getProductsCount() {
        return async (req, res) => {
            let product_count = await ProductsService.getProductsCount();

            res.status(200).send({
                product_count : product_count
            });
        }
    }
}

module.exports = ProductsController;