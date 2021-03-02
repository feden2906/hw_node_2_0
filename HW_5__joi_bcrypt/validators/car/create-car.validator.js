const Joi = require('joi');

const { constants: { CURRENT_YEAR } } = require('../../constants');

module.exports = Joi.object({
  year: Joi
      .number()
      .integer()
      .min(CURRENT_YEAR - 20)
      .max(CURRENT_YEAR),
  model: Joi
      .string(),
  owner: Joi
      .number()
      .integer()
      .when('model' || 'producer', { is: true, then: Joi.required() }),
  price: Joi
      .number()
      .min(0),
  producer: Joi
      .string()
      .min(3)
      .max(30)
});
