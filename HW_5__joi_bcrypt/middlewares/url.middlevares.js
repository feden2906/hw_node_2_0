const { statusCodes, statusMessages } = require('../constants');

module.exports = {
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
