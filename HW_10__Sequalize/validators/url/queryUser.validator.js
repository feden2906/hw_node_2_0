const Joi = require('joi');

const { constants } = require('../../constants');

module.exports = Joi.object({
  prefLang: Joi
      .string(),
  name: Joi
      .string()
      .alphanum()
      .min(1)
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
      .valid('0', '1'),
  gender: Joi
      .valid('male', 'female'),
  sortBy: Joi
      .valid('yearBorn', 'name', 'updatedAt', 'createdAt'),
  order: Joi
      .valid('asc', 'desc')
});
