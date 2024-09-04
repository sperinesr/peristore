const mongoose = require("mongoose")

const mongoosePaginate = require("mongoose-paginate-v2")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    picture: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true }
})

productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model("products", productSchema)

module.exports = ProductModel