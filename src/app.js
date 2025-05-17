const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const hbsHelpers = require('./helpers/handlebars');
const cookieParser = require("cookie-parser")
const session = require('./config/session.config.js');
const { requireAuth } = require('./middleware/auth.middleware.js')

// base de datos
const connectDB = require('./config/database.config.js');
const { port } = require('./config/env.config.js');

connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(methodOverride('_method')); //para metodos delete y  put
app.use(express.static("./src/public"))

app.use(cookieParser());

app.use(session)

app.engine('handlebars', exphbs.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: hbsHelpers
}));

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

const productRouter = require("../src/routes/product.router.js")
const userRouter = require("../src/routes/user.router.js")
const adminRouter = require("../src/routes/admin.router.js")
const viewRouter = require("../src/routes/view.router.js");

app.use("/", viewRouter, productRouter, userRouter)
app.use("/admin", requireAuth, adminRouter)


app.listen(port, () => {
    console.log("Servidor conectado al puerto " + port)
})