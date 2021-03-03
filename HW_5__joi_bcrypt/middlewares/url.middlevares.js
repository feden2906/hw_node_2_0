const { statusCodes } = require('../constants');
const { urlValidators } = require('../validators');

module.exports = {
  checkQuery: (req, res, next) => {
    try {
      const { error } = urlValidators.queryValidator.validate(req.query);

      if (error) {
        throw new Error(error.details[0].message);
      }

      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
