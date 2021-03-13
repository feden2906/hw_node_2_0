const Joi = require('joi');

const { constants } = require('../../constants');

module.exports = Joi.object({
  prefLang: Joi
      .string(),
  name: Joi
      .string()
      .alphanum()
      .min(2)
      .max(50),
  yearBorn: Joi
      .number()
      .integer()
      .min(constants.CURRENT_YEAR - 100)
      .max(constants.CURRENT_YEAR - 18),
  yearBornGte: Joi
      .number()
      .integer()
      .min(constants.CURRENT_YEAR - 100)
      .max(constants.CURRENT_YEAR - 18),
  yearBornLte: Joi
      .number()
      .integer()
      .min(constants.CURRENT_YEAR - 100)
      .max(constants.CURRENT_YEAR - 18),
  isMarried: Joi
      .boolean(),
  gender: Joi
      .valid('male', 'female'),
  order: Joi
      .valid('asc', 'desc')
});
