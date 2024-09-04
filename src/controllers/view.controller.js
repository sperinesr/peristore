// const ProductModel = require("../models/product.model.js");
const ProductRepository = require("../repositories/product.repository.js");
const productRepo = new ProductRepository();
// const CartRepository = require("../repositories/cart.repository.js");
// const cartRepository = new CartRepository();
// logger
// const LoggerRepository = require("../repositories/logger.repository.js")
// const loggerRepository = new LoggerRepository()


class ViewsController {
    // async renderProducts(req, res) {
    //     try {
    //         const page = req.query.page || 1;
    //         const limit = req.query.limit || 3
    //         const uid = req.user.id

    //         const skip = (page - 1) * limit;

    //         const products = await ProductModel
    //             .find({ owner: { $ne: uid.toString() } })
    //             .skip(skip)
    //             .limit(limit);

    //         const totalProducts = await ProductModel.countDocuments();

    //         const totalPages = Math.ceil(totalProducts / limit);

    //         const hasPrevPage = page > 1;
    //         const hasNextPage = page < totalPages;

    //         const newArray = products.map(product => {
    //             const { _id, ...rest } = product.toObject();
    //             return { id: _id, ...rest }; // Agregar el ID al objeto
    //         });

    //         const cartId = req.user.cart.toString();

    //         res.render("products", {
    //             products: newArray,
    //             hasPrevPage,
    //             hasNextPage,
    //             prevPage: page > 1 ? parseInt(page) - 1 : null,
    //             nextPage: page < totalPages ? parseInt(page) + 1 : null,
    //             currentPage: page,
    //             totalPages,
    //             cartId
    //         });

    //     } catch (error) {
    //         console.error("Error al obtener productos", error);
    //         res.status(500).json({
    //             status: 'error',
    //             error: "Error en view controller"
    //         });
    //     }
    // }

    // async renderProduct(req, res) {

    //     const pid = req.params.pid;

    //     try {
    //         const product = await ProductModel.find({ _id: pid })

    //         const newProduct = product.map(product => {
    //             const { _id, ...rest } = product.toObject();
    //             return { id: _id, ...rest }; // Agregar el ID al objeto
    //         });

    //         const cartId = req.user.cart.toString();

    //         res.render("products", {
    //             products: newProduct,
    //             cartId
    //         });

    //     } catch (error) {
    //         console.error("Error al obtener producto", error);
    //         res.status(500).json({
    //             status: 'error',
    //             error: "Error en view controller"
    //         });
    //     }
    // }

    // async renderCart(req, res) {
    //     const cartId = req.params.cid;
    //     try {
    //         const cart = await cartRepository.getCartById(cartId);

    //         if (!cart) {
    //             console.log("No existe ese carrito con el id");
    //             return res.status(404).json({ error: "Carrito no encontrado" });
    //         }


    //         let totalCompra = 0;

    //         const productsInCart = cart.products.map(item => {
    //             const product = item.product.toObject();

    //             const quantity = item.quantity;
    //             const totalPrice = product.price * quantity;


    //             totalCompra += totalPrice;

    //             return {
    //                 product: { ...product, totalPrice },
    //                 quantity,
    //                 cartId
    //             };
    //         });

    //         res.render("cart", { products: productsInCart, totalCompra, cartId });
    //     } catch (error) {
    //         console.error("Error al obtener el carrito", error);
    //         res.status(500).json({ error: "Error interno del servidor" });
    //     }
    // }

    async renderLogin(req, res) {

        res.render("login");
    }

    // async renderRegister(req, res) {
    //     res.render("register");
    // }

    // async renderRealTimeProducts(req, res) {

    //     try {

    //         const products = await ProductModel.find();
    //         const newProducts = products.map(product => {
    //             const { _id, ...rest } = product.toObject();
    //             return { id: _id, ...rest };
    //         });

    //         res.render("realtimeproducts", {
    //             owner: req.user.id.toString(),
    //             role: req.user.role.toString(),
    //             products: newProducts
    //         });

    //     } catch (error) {
    //         console.log("error en la vista real time", error);
    //         res.status(500).json({ error: "Error interno del servidor" });
    //     }
    // }

    // async renderChat(req, res) {
    //     res.render("chat");
    // }

    // async renderHome(req, res) {
    //     res.render("login");
    // }

    // async renderLoggerTest(req, res) {
    //     try {
    //         const logs = await loggerRepository.getLogs()

    //         const newLogs = logs.map(log => {
    //             const { _id, ...rest } = log.toObject();
    //             return { id: _id, ...rest };
    //         });

    //         res.render("loggertest", { logs: newLogs });

    //     } catch (error) {
    //         await loggerRepository.addLog(error)
    //         console.error("Error al obtener logs", error);
    //         res.status(500).json({ error: "Error interno del servidor" });
    //     }

    // }

    // // integradora 3

    // async renderPasswordReset(req, res) {
    //     res.render("passwordreset")
    // }

    // async renderChangePassword(req, res) {
    //     res.render("changepassword")
    // }

    // async renderConfirmation(req, res) {
    //     res.render("sendconfirmation")
    // }

    async renderAdmin(req, res) {

        const products = await productRepo.getProducts()

        const newArray = products.map(product => {
            const { _id, ...rest } = product.toObject();
            return { id: _id, ...rest }; // Agregar el ID al objeto
        });

        res.render("admin", { products: newArray });
    }
}

module.exports = ViewsController;