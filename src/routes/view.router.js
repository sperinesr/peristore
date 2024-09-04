const express = require("express");
const router = express.Router();

const ViewsController = require("../controllers/view.controller.js");
const viewsController = new ViewsController();

const UserController = require("../controllers/user.controller.js")
const userController = new UserController()

const checkUserRole = require("../middleware/checkrole.js");

// const passport = require("passport");

// router.get("/products", checkUserRole(['admin', 'premium']), passport.authenticate('jwt', { session: false }), viewsController.renderProducts);
// router.get("/products/:pid", checkUserRole(['admin', 'premium']), passport.authenticate('jwt', { session: false }), viewsController.renderProduct);

// router.get("/carts/:cid", checkUserRole(['user', 'premium']), viewsController.renderCart);
router.get("/login",viewsController.renderLogin);
router.post("/login", userController.login);
// router.get("/register", viewsController.renderRegister);
// router.get("/realtimeproducts", checkUserRole(['admin', 'premium']), viewsController.renderRealTimeProducts);
// router.get("/chat", checkUserRole(['user', 'premium']), viewsController.renderChat);
// router.get("/", viewsController.renderHome);

// logger
// router.get("/loggertest", viewsController.renderLoggerTest);

// integradora 3
// router.get("/passwordreset", viewsController.renderPasswordReset);
// router.get("/password", viewsController.renderChangePassword);
// router.get("/sendconfirmation", viewsController.renderConfirmation);

router.get("/admin/products", checkUserRole(['admin']), viewsController.renderAdmin);

module.exports = router;