const { statusMessages, statusCodes } = require('../constants');
const { userValidators } = require('../validators');

module.exports = {
  isUserVal: (req, res, next) => {
    try {
      const { error } = userValidators.createUserValidator.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }

      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  isIdVal: (req, res, next) => {
    try {
      const { params: { carID }, query: { prefLang = 'en' } } = req;

      if (carID > 24 || carID < 24) {
        throw new Error(statusMessages.NOT_VALID_ID[prefLang]);
      }

      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },
};
