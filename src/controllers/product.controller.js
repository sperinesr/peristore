const ProductRepository = require("../repositories/product.repository.js")
const productRepo = new ProductRepository()

class ProductController {

    async getProduct(req, res) {

        const id = req.params.pid

        try {

            const product = await productRepo.getProduct(id)

            res.status(200).render("products/product", product.toJSON())

        } catch (error) {
            res.status(500).send("Error en controller")
        }

    }

    async getAvailableProducts(req, res) {

        try {

            const products = await productRepo.getAvailbleProducts()

            const newArray = products.map(product => {
                const { _id, ...rest } = product.toObject();
                return { id: _id, ...rest }; // Agregar el ID al objeto
            });

            res.status(200).render("products/products", { products: newArray })

        } catch (error) {
            // res.status(500).send("Error en product controller - getAvailableProducts")

            res.status(200).render("products/products", {
                products: [{
                    id: "qwerty",
                    name: "test",
                    category: "test",
                    picture: "nothing",
                    stock: 123,
                    price: 123
                }] // usar solo cuando no hay conexion a mongodb
            })

        }
    }
}

module.exports = ProductController