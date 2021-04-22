const Joi = require('joi');
let validator = {};

validator.registration = {
    validate: {
        type: "json",
        body: {
            name: Joi.string()
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(6)
                .required()
        }
    }
};

validator.login = {
    validate: {
        type: "json",
        body: {
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(6)
                .required()
        }
    }
};
module.exports = validator;