const express = require("express");
const router = express.Router();

const ViewsController = require("../controllers/view.controller.js");
const viewsController = new ViewsController();

const UserController = require("../controllers/user.controller.js")
const userController = new UserController()

router.get("/login", viewsController.renderLogin);
router.post("/login", userController.login);

//estado ok para checkear el estado de la app en render
router.get("/healthz", (req, res) => {
    res.status(200).send("OK");
});

module.exports = router;