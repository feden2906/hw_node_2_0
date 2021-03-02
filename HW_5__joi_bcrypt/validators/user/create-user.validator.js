const Joi = require('joi');

const { constants, regexpEnum } = require('../../constants');

module.exports = Joi.object({
  name: Joi
      .string()
      .alphanum()
      .min(2)
      .max(50)
      .required(),
  email: Joi
      .string()
      .regex(regexpEnum.EMAIL_REGEXP)
      .required(),
  password: Joi
      .string()
      .regex(regexpEnum.PASSWORD_REGEXP),
  phone: Joi
      .string()
      .regex(regexpEnum.PHONE_REGEXP),
  yearBorn: Joi
      .number()
      .min(constants.CURRENT_YEAR - 100)
      .max(constants.CURRENT_YEAR - 18),
  cars: Joi
      .array()
});
