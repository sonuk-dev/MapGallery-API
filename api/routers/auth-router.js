const JoiRouter = require("koa-joi-router");
const authRouter = new JoiRouter();
const userController = require('../controllers/user-controllers');
const validator = require('../../libs/validation');

authRouter.post('/auth/login', validator.login, userController.loginUser);
authRouter.post('/auth/registration', validator.registration, userController.addUser);

module.exports = authRouter;