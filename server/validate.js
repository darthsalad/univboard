const Joi = require('@hapi/joi')

const registerValidate = (params) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()    
    };
    return Joi.validate(params, schema);
}

const loginValidate = (params) => {
    const schema = {
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()    
    };
    return Joi.validate(params, schema);
}

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;