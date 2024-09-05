const UserModel = require("../models/user.model.js")

class UserRepository {

    async createUser({ first_name, last_name, email, password }) {
        try {

            if (!first_name || !last_name || !email || !password) {

                console.log("No se ingresaron todos los datos")
                return
            }

            const exist = await UserModel.findOne({ email: email })

            if (exist) {
                console.log("Usuario ya existe")
                return
            }

            const newUser = new UserModel({
                first_name,
                last_name,
                email,
                password
            })

            await newUser.save()

            const result = await UserModel.findOne({ email: newUser.email })

            console.log("Usuario agregado")

            return result

        } catch (error) {

            console.log("Error en user repository")
        }
    }

    async getUsers() {
        try {

            const users = await UserModel.find()

            if (!users) {
                console.log("Usuarios no encontrados")
                return
            }

            console.log("Usuarios encontrados")

            return users

        } catch (error) {

            console.log("Error en user repository")
        }
    }

    async getUser(email) {
        try {

            const user = await UserModel.findOne({ email })

            if (!user || user === undefined) {
                console.log("Usuario no se encuentra")
                return null
            }

            console.log("Usuario encontrado")

            return user

        } catch (error) {

            console.log("Error en user repository - getUser")
        }
    }

    async updateUser(email, { user }) {
        try {

        } catch (error) {

            console.log("Error en user repository")
        }
    }

    async deleteUser(email) {
        try {

            const userID = await UserModel.findOne({ email: email })

            const user = await UserModel.findByIdAndDelete(userID._id)

            if (!user) {
                console.log("Usuario no se encuentra")
            }

            console.log("Usuario eliminado")

            return user

        } catch (error) {

            console.log("Error en user repository")
        }
    }
}

module.exports = UserRepository