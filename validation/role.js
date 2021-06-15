const Joi = require("@hapi/joi");

const roleValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

module.exports.roleValidation = roleValidation;
