const express = require("express")
const router = express.Router()

const ProductController = require("../controllers/product.controller.js")
const pcontroller = new ProductController()

router.post("/admin/products", pcontroller.createProduct)
router.get("/admin/products", pcontroller.getProducts)
router.get("/", pcontroller.getAvailableProducts)
router.get("/products/:pid", pcontroller.getProduct)
router.post("/admin/:pid", pcontroller.updateProduct)
router.post("/:pid", pcontroller.deleteProduct)

module.exports = router

