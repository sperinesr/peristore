const express = require("express")
const router = express.Router()

const UserController = require("../controllers/user.controller.js")
const ucontroller = new UserController()

router.post("/", ucontroller.createUser)
router.get("/", ucontroller.getUsers)
router.get("/:uid", ucontroller.getUser)
router.put("/:uid", ucontroller.updateUser)
router.delete("/:uid", ucontroller.deleteUser)

router.post("/login", ucontroller.login);
// router.get("/profile", ucontroller.profile);

module.exports = router

