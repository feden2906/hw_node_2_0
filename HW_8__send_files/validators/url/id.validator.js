const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
  userID: Joi
      .string()
      .required()
      .regex(regexpEnum.MONGO_ID)
});
