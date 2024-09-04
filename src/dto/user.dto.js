class UserDTO {
    constructor(first_name, last_name, email, role) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
    }
}

module.exports = UserDTO;