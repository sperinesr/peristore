const express = require("express")
const router = express.Router()

const ProductController = require("../controllers/product.controller.js")
const pcontroller = new ProductController()


router.get("/", pcontroller.getAvailableProducts)
router.get("/products/:pid", pcontroller.getProduct)


module.exports = router

