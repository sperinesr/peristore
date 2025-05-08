const ProductRepository = require("../repositories/product.repository.js")
const productRepo = new ProductRepository()

class ProductController {

    async createProduct(req, res) {

        const newProduct = req.body

        try {

            const product = await productRepo.createProduct(newProduct)
            res.status(200).redirect("/admin/products")

            // res.status(200).send(product)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async getProducts(req, res) {

        try {

            const products = await productRepo.getProducts()

            const newArray = products.map(product => {
                const { _id, ...rest } = product.toObject();
                return { id: _id, ...rest }; // Agregar el ID al objeto
            });

            res.status(200).render("admin", { products: newArray })

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async getProduct(req, res) {

        const id = req.params.pid

        try {

            const product = await productRepo.getProduct(id)

            res.status(200).render("product", product.toJSON())

        } catch (error) {
            res.status(500).send("Error en controller")
        }

    }

    async updateProduct(req, res) {

        const id = req.params.pid
        const product = req.body

        try {

            const updatedProduct = await productRepo.updateProduct(id, { product })

            res.status(200).redirect("/admin/products")
            // res.status(200).send(updatedProduct)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async deleteProduct(req, res) {

        const id = req.params.pid

        try {

            const deletedProduct = await productRepo.deleteProduct(id)

            res.status(200).redirect("/admin/products")
            // res.status(200).send(deletedProduct)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async getAvailableProducts(req, res) {

        try {

            const products = await productRepo.getAvailbleProducts()
            
            if (products) {
                console.log("Productos encontrados")
            }

            const newArray = products.map(product => {
                const { _id, ...rest } = product.toObject();
                return { id: _id, ...rest }; // Agregar el ID al objeto
            });

            res.status(200).render("products", { products: newArray })

        } catch (error) {
            // res.status(500).send("Error en product controller - getAvailableProducts")

            res.status(200).render("products", {
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