const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
});

const Users = mongoose.model('Users', UsersSchema);

Users.saveUser = (async (name, email, password) => {
    let cryptPass = await bcrypt.hash(password, saltRounds);

    let user = new Users({
        name: name,
        email: email,
        password: cryptPass
    });
    return user.save();
});

Users.loginUser = (async (email, password) => {
    let user = await Users.findOne({ email: email });

    if (!user)
        return { status: 400, err: `{"email": "doesn't exist"}` };

    let crypt = await bcrypt.compare(password, user.password);
    if (crypt) {
        return user;
    }
    return { status: 400, err: `{"password": "Password is wrong"}` };
});

module.exports = Users;