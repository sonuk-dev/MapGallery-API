const UserModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

let userController = {};

userController.addUser = (async (ctx) => {
    let result = await UserModel.saveUser(
        ctx.request.body.name,
        ctx.request.body.email,
        ctx.request.body.password
    );

    if (result.err) throw ctx.throw(result.status, result.err)
    const token = jwt.sign({ user: result }, 'A very secret key');
    ctx.status = 200;
    ctx.body = {
      user: result,
      token
    }
});

userController.loginUser = (async (ctx) => {
    let result = await UserModel.loginUser(
        ctx.request.body.email,
        ctx.request.body.password
    );
    if (!result || result.err) throw ctx.throw(result.status, result.err)
    const token = jwt.sign({ user: result }, 'A very secret key')
    ctx.status = 200;
    ctx.body = {
      user: result,
      token
    }
});

module.exports = userController;