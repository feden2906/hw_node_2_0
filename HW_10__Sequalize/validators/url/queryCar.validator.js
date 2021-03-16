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
  priceGte: Joi
      .number()
      .integer()
      .min(0)
      .max(500000),
  priceLte: Joi
      .number()
      .integer()
      .min(0)
      .max(500000),
  producer: Joi
      .valid('bmw', 'mercedes', 'audi', 'tesla'),
  sortBy: Joi
      .valid('model', 'price', 'producer', 'year'),
  order: Joi
      .valid('asc', 'desc')
});
