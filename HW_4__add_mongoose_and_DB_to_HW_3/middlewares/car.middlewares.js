const statusCodes = require('../constants/statusCodes.enum');
const statusMessages = require('../constants/statusMessages');

module.exports = {
  isModelVal: (req, res, next) => {
    try {
      const { body: { model }, query: { prefLang = 'en' } } = req;

      if (!model) {
        throw new Error(statusMessages.MODEL_IS_EMPTY[prefLang]);
      }

      if (!Number.isNaN(+model)) {
        throw new Error(statusMessages.NOT_VALID_MODEL[prefLang]);
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
