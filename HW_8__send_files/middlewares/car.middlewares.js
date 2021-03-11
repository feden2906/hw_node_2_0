const { statusCodes, statusMessages } = require('../constants');
const { ErrorHandler } = require('../helpers');

module.exports = {
  isModelVal: (req, res, next) => {
    try {
      const { body: { model }, query: { prefLang = 'en' } } = req;

      if (!model) {
        throw new ErrorHandler(statusMessages.MODEL_IS_EMPTY[prefLang], statusCodes.BAD_REQUEST);
      }

      if (!Number.isNaN(+model)) {
        throw new ErrorHandler(statusMessages.NOT_VALID_MODEL[prefLang], statusCodes.BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
