const UserRepository = require("../repositories/user.repository.js")
const userRepo = new UserRepository()

const UserDTO = require("../dto/user.dto.js")

const jwt = require("jsonwebtoken");

const { createHash, isValidPassword } = require("../utils/hashbcrypt.js");

class UserController {

    async createUser(req, res) {

        const newUser = req.body

        try {

            const user = await userRepo.createUser(newUser)

            res.status(200).send(user)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async getUsers(req, res) {

        try {

            const users = await userRepo.getUsers()

            const newArray = users.map(user => {
                const { _id, ...rest } = user.toObject();
                return { id: _id, ...rest }; // Agregar el ID al objeto
            });

            res.status(200).send(newArray)
            // res.status(200).render("users", { users: newArray })

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async getUser(req, res) {

        const uid = req.params.uid

        try {

            const user = await userRepo.getUser(uid)

            res.status(200).send(user)

        } catch (error) {
            res.status(500).send("Error en user controller - getUser")
        }

    }

    async updateUser(req, res) {

        const uid = req.params.uid
        const user = req.body

        try {

            const updatedUser = await userRepo.updateUser(uid, user)

            res.status(200).send(updatedUser)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async deleteUser(req, res) {

        const uid = req.params.uid

        try {

            const deletedUser = await userRepo.deleteUser(uid)

            res.status(200).send(deletedUser)

        } catch (error) {
            res.status(500).send("Error en controller")
        }
    }

    async login(req, res) {

        const { email, password } = req.body

        try {
            const userFound = await userRepo.getUser(email);

            if (!userFound) {
                return res.status(401).send("Usuario no válido");
            }

            const isValid = isValidPassword(password, userFound);

            if (!isValid) {
                return res.status(401).send("Contraseña incorrecta");
            }

            const token = jwt.sign({ user: userFound }, "peristore", {
                expiresIn: "1h"
            });

            // usuarioEncontrado.last_connection = new Date()
            // await usuarioEncontrado.save()

            res.cookie("peristoreToken", token, {
                maxAge: 3600000,
                httpOnly: true
            });

            res.status(200).redirect("/admin/products");

        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }

    // async profile(req, res) {
    //     //Con DTO: 
    //     const userDto = new UserDTO(req.user.first_name, req.user.last_name, req.user.email, req.user.role);
    //     res.render("profile", { user: userDto });
    // }
}

module.exports = UserController