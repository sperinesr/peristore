const express = require("express")
const app = express()

const exphbs = require("express-handlebars")

const cookieParser = require("cookie-parser")

// const methodOverride = require('method-override'); //para metodos delete y  put

const port = 8080

require("./database.js")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(methodOverride('_method')); //para metodos delete y  put
app.use(express.static("./src/public"))



app.use(cookieParser());

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

const productRouter = require("../src/routes/product.router.js")
const userRouter = require("../src/routes/user.router.js")
const viewRouter = require("../src/routes/view.router.js")

app.use("/", viewRouter, productRouter, userRouter)


app.listen(port, () => {
    console.log("Servidor conectado al puerto " + port)
})