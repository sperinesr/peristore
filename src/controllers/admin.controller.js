const ProductRepository = require("../repositories/product.repository.js")
const productRepo = new ProductRepository()

class ProductController {

    async getProducts(req, res) {

        try {

            const products = await productRepo.getProducts()

            const newArray = products.map(product => {
                const { _id, ...rest } = product.toObject();
                return { id: _id, ...rest }; // Agregar el ID al objeto
            });

            res.status(200).render("products/admin", { products: newArray })

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async createProduct(req, res) {

        const newProduct = req.body

        try {

            const product = await productRepo.createProduct(newProduct)
            res.status(200).redirect("/admin?created=1")

            // res.status(200).send(product)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async updateProduct(req, res) {

        const id = req.params.pid
        const product = req.body

        try {

            const updatedProduct = await productRepo.updateProduct(id, { product })

            res.status(200).redirect("/admin?updated=1")
            // res.status(200).send(updatedProduct)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async deleteProduct(req, res) {

        const id = req.params.pid

        try {

            const deletedProduct = await productRepo.deleteProduct(id)

            res.status(200).redirect("/admin?deleted=1")
            // res.status(200).send(deletedProduct)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async updateAll(req, res) {
        const { products } = req.body;

        try {
            for (const product of products) {
                await productRepo.updateProduct(product.id, {
                    name: product.name,
                    category: product.category,
                    picture: product.picture,
                    price: product.price,
                    stock: product.stock
                });
            }

            res.redirect('/admin?updated=1'); //ruta para alerta de productos actualizados
        } catch (error) {
            console.error('Error al actualizar productos:', error);
            res.status(500).send('Error al actualizar productos');
        }
    };
}

module.exports = ProductController