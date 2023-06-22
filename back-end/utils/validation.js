const Joi = require('joi');

const phoneRegex = '^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$'

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(6).max(50).required(),
        password: Joi.string().min(6).max(50).required(),
        phoneNumber: Joi.string().pattern(new RegExp(phoneRegex))
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().pattern(new RegExp(phoneRegex)),
        password: Joi.string().min(6).max(50).required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
