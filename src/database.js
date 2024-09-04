const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://sebastianperinesr:coderhouse@cluster0.b94vd8g.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectado a la BD"))
    .catch(error => console.log(error))