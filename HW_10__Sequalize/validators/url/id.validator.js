const Joi = require('joi');

// const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
  userID: Joi
      .number()
      .required()
});
