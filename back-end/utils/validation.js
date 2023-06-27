const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().alphanum().min(6).max(50).required(),
        lastName: Joi.string().alphanum().min(6).max(50).required(),
        password: Joi.string().min(6).max(50).required(),
        email: Joi.string().required()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).max(50).required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
