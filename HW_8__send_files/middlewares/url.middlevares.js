const { statusCodes } = require('../constants');
const { urlValidators } = require('../validators');
const { ErrorHandler } = require('../helpers');

module.exports = {
  checkQuery: (req, res, next) => {
    try {
      const { error } = urlValidators.queryValidator.validate(req.query);

      if (error) {
        throw new ErrorHandler(error.details[0].message, statusCodes.BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
