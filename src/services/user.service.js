const User = require('../models/user.model.js');

exports.update = async (userId, data) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    if (data.email) user.email = data.email;
    if (data.password) user.password = data.password; // el pre('save') se encarga del hash

    await user.save(); // Aquí se ejecuta el middleware
};