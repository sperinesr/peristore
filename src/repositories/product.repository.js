const ProductModel = require("../models/product.model.js")

class ProductRepository {

    async createProduct({ name, category, picture, stock, price }) {
        try {

            if (!name || !category || !picture || !stock || !price) {

                console.log("No se ingresaron todos los datos")
                return
            }

            const exist = await ProductModel.findOne({ name: name })

            if (exist) {
                console.log("Producto ya existe")
                return
            }

            const newProduct = new ProductModel({
                name,
                category,
                picture,
                stock,
                price
            })

            await newProduct.save()

            const result = await ProductModel.findOne({ name: newProduct.name })

            console.log("Producto agregado")

            return result

        } catch (error) {

            console.log("Error en product repository")
        }
    }

    async getProducts() {
        try {

            const products = await ProductModel.find().sort({ name: 1 });

            if (!products) {
                console.log("Productos no encontrados")
                return
            }

            // console.log("Productos encontrados")

            return products

        } catch (error) {

            console.log("Error en product repository")
        }
    }

    async getProduct(id) {
        try {

            const product = await ProductModel.findById(id)

            if (!product) {
                console.log("Producto no se encuentra")
                return
            }

            console.log("Producto encontrado")

            return product

        } catch (error) {

            console.log("Error en repository")
        }
    }

    async updateProduct(id, { product }) {
        try {

            const updatedProduct = await ProductModel.findByIdAndUpdate(id, product)

            if (!updatedProduct) {
                console.log("Producto no se encuentra")
            }

            console.log("Producto actualizado")

            return updatedProduct

        } catch (error) {

            console.log("Error en product repository")
        }
    }

    async deleteProduct(id) {
        try {

            const product = await ProductModel.findByIdAndDelete(id)

            if (!product) {
                console.log("Producto no se encuentra")
            }

            console.log("Producto eliminado")

            return product

        } catch (error) {

            console.log("Error en product repository")
        }
    }

    async getAvailbleProducts() {
        try {

            const products = await ProductModel.find({ stock: { $gt: 0 } }).sort({ name: 1 });

            if (!products) {
                console.log("Productos no encontrados")
                return
            } else {
                return products
            }

        } catch (error) {

            // console.log("Error en product repository - getAvailbleProducts")

            return [{
                id: "qwerty",
                name: "test",
                category: "test",
                picture: "nothing",
                stock: 123,
                price: 123
            }] // usar solo cuando no hay conexion a mongodb
        }
    }

}

module.exports = ProductRepository