const { userService } = require('../services');
const { statusMessages, statusCodes } = require('../constants');
const { userValidators, urlValidators } = require('../validators');
const { ErrorHandler } = require('../helpers');

module.exports = {
  findUserById: async (req, res, next) => {
    try {
      const { params: { userID }, query: { prefLang = 'en' } } = req;

      const { error } = urlValidators.idValidator.validate({ userID });

      if (error) {
        throw new ErrorHandler(statusMessages.NOT_VALID_ID[prefLang], statusCodes.BAD_REQUEST);
      }

      const { dataValues } = await userService.findUserById(userID) || { };

      if (!dataValues) {
        throw new ErrorHandler(statusMessages.USER_NOT_FOUND[prefLang], statusCodes.BAD_REQUEST);
      }

      req.profile = dataValues;
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserVal: (req, res, next) => {
    try {
      const { error } = userValidators.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(error.details[0].message, statusCodes.BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserExist: async (req, res, next) => {
    try {
      const { body: { email }, query: { prefLang = 'en' } } = req;

      const user = await userService.findUser({ email });

      if (user) {
        throw new ErrorHandler(statusMessages.USER_IS_EXISTS[prefLang], statusCodes.BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
