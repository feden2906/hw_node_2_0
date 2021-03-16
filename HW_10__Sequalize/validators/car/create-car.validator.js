const Joi = require('joi');

const { constants: { CURRENT_YEAR } } = require('../../constants');

module.exports = Joi.object({
  year: Joi
      .number()
      .integer()
      .min(1950)
      .max(CURRENT_YEAR),
  model: Joi
      .string(),
  owner: Joi
      .number()
      .integer()
      .when('model' || 'producer' || 'year' || 'price', { is: true, then: Joi.required() }),
  price: Joi
      .number()
      .min(0),
  producer: Joi
      .valid('bmw', 'mercedes', 'audi', 'tesla'),
});
