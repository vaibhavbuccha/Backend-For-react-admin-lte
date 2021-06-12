const Joi = require("@hapi/joi");

const departmentValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

module.exports.departmentValidation = departmentValidation;
