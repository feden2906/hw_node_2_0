const { statusCodes } = require('../constants');
const { urlValidators } = require('../validators');
const { ErrorHandler } = require('../helpers');

module.exports = {
  checkUserQuery: (req, res, next) => {
    try {
      const { error } = urlValidators.queryUserValidator.validate(req.query);

      if (error) {
        throw new ErrorHandler(error.details[0].message, statusCodes.BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkCarQuery: (req, res, next) => {
    try {
      const { error } = urlValidators.queryCarValidator.validate(req.query);

      if (error) {
        throw new ErrorHandler(error.details[0].message, statusCodes.BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  disableQuery: (req, res, next) => {
    try {
      const { error } = urlValidators.disableQuery.validate(req.query);

      if (error) {
        throw new ErrorHandler(error.details[0].message, statusCodes.BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
