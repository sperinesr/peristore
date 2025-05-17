const UserRepository = require("../repositories/user.repository.js")
const userRepo = new UserRepository()

const bcrypt = require('bcrypt');

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

        const { email, password } = req.body;

        const user = await userRepo.getUser(email);
        if (!user) return res.status(401).render('login', { error: 'Usuario no encontrado' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).render('login', { error: 'Contraseña incorrecta' });

        req.session.user = { id: user._id, email: user.email };
        res.redirect('/admin');
    }

}

module.exports = UserController