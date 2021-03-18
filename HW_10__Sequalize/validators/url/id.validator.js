const Joi = require('joi');

module.exports = Joi.object({
  userID: Joi
      .number()
      .required()
});
