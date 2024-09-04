// importamos
const bcrypt = require("bcrypt")

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// compara los password, retorna true o false segun corresponda
const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

module.exports = {
    createHash,
    isValidPassword
}