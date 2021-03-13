const Joi = require('joi');

const { constants } = require('../../constants');

module.exports = Joi.object({
  prefLang: Joi
      .string(),
  model: Joi
      .string()
      .alphanum()
      .min(1)
      .max(50),
  year: Joi
      .number()
      .integer()
      .min(1950)
      .max(constants.CURRENT_YEAR),
  yearGte: Joi
      .number()
      .integer()
      .min(1950)
      .max(constants.CURRENT_YEAR),
  yearLte: Joi
      .number()
      .integer()
      .min(1950)
      .max(constants.CURRENT_YEAR),
  producer: Joi
      .valid('bmw', 'mercedes', 'audi', 'tesla'),
  order: Joi
      .valid('asc', 'desc')
});
