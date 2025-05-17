const express = require("express")
const router = express.Router()

const UserController = require("../controllers/user.controller.js")
const ucontroller = new UserController()

// router.post("/", ucontroller.createUser)
// router.get("/", ucontroller.getUsers)
// router.get("/:uid", ucontroller.getUser)
// router.post("/:uid", ucontroller.updateUser)
// router.delete("/:uid", ucontroller.deleteUser)

router.post("/login", ucontroller.login);
// router.get("/profile", ucontroller.profile); //por si se necesita un perfil

module.exports = router

