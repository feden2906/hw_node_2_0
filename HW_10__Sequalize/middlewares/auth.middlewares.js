const jwt = require('jsonwebtoken');

const { authService, userService } = require('../services');
const { statusCodes, statusMessages, constants } = require('../constants');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../configs/configs');
const { ErrorHandler } = require('../helpers');

module.exports = {
  isAvailable: (req, res, next) => {
    try {
      const { tokens, params: { userID }, query: { prefLang = 'en' } } = req;

      if (tokens.userID.toString() !== userID.toString()) {
        throw new ErrorHandler(statusMessages.AUTHORIZATION[prefLang], statusCodes.UNAUTHORIZED);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserExistForAuth: async (req, res, next) => {
    try {
      const { body: { email }, query: { prefLang = 'en' } } = req;

      const { dataValues } = await userService.findUser({ email }) || {};

      if (!dataValues) {
        throw new ErrorHandler(statusMessages.WRONG_EMAIL_OR_PASSWORD[prefLang], statusCodes.BAD_REQUEST);
      }

      req.profile = dataValues;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      const { prefLang = 'en' } = req.query;
      const access_token = req.get(constants.AUTHORIZATION);

      if (!access_token) {
        throw new ErrorHandler(statusMessages.TOKEN_IS_REQUIRED[prefLang], statusCodes.BAD_REQUEST);
      }

      jwt.verify(access_token, JWT_SECRET, (err) => {
        if (err) {
          throw new ErrorHandler(statusMessages.TOKEN_NOT_VALID[prefLang], statusCodes.UNAUTHORIZED);
        }
      });

      const { dataValues } = await authService.getTokensByAccess(access_token);

      if (!dataValues) {
        throw new ErrorHandler(statusMessages.TOKEN_NOT_VALID[prefLang], statusCodes.BAD_REQUEST);
      }

      req.tokens = dataValues;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const { prefLang = 'en' } = req.query;
      const refresh_token = req.get(constants.AUTHORIZATION);

      if (!refresh_token) {
        throw new ErrorHandler(statusMessages.TOKEN_IS_REQUIRED[prefLang], statusCodes.BAD_REQUEST);
      }

      jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
        if (err) {
          throw new ErrorHandler(statusMessages.TOKEN_NOT_VALID[prefLang], statusCodes.BAD_REQUEST);
        }
      });

      const { dataValues } = await authService.getTokensByRefresh(refresh_token) || {};

      req.tokens = dataValues;
      next();
    } catch (e) {
      next(e);
    }
  }
};
