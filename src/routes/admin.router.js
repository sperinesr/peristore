const express = require("express")
const router = express.Router()

const AdminController = require("../controllers/admin.controller.js")
const acontroller = new AdminController()

router.get("/", acontroller.getProducts)
router.post("/create", acontroller.createProduct)
router.post("/update/", acontroller.updateAll)
router.post("/delete/:pid", acontroller.deleteProduct)

module.exports = router

