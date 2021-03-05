const jwt = require('jsonwebtoken');

const { User, O_Auth } = require('../models');
const { statusCodes, statusMessages, constants } = require('../constants');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../configs/configs');

module.exports = {
  isAvailable: (req, res, next) => {
    try {
      const { tokens, params: { userID }, query: { prefLang = 'en' } } = req;

      if (tokens.userID.id.toString() !== userID.toString()) {
        throw new Error(statusMessages.AUTHORIZATION[prefLang]);
      }

      next();
    } catch (e) {
      res.status(statusCodes.UNAUTHORIZED).json(e.message);
    }
  },

  isUserExistForAuth: async (req, res, next) => {
    try {
      const { body: { email }, query: { prefLang = 'en' } } = req;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error(statusMessages.WRONG_EMAIL_OR_PASSWORD[prefLang]);
      }

      req.profile = user;
      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      const { prefLang = 'en' } = req.query;
      const access_token = req.get(constants.AUTHORIZATION);

      if (!access_token) {
        throw new Error(statusMessages.TOKEN_IS_REQUIRED[prefLang]);
      }

      jwt.verify(access_token, JWT_SECRET, (err) => {
        if (err) {
          res.status(statusCodes.UNAUTHORIZED).json(statusMessages.TOKEN_NOT_VALID[prefLang]);
        }
      });

      const tokens = await O_Auth.findOne({ access_token }).populate('userID');

      if (!tokens) {
        throw new Error(statusMessages.TOKEN_NOT_VALID[prefLang]);
      }

      req.tokens = tokens;
      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const { prefLang = 'en' } = req.query;
      const refresh_token = req.get(constants.AUTHORIZATION);

      if (!refresh_token) {
        throw new Error(statusMessages.TOKEN_IS_REQUIRED[prefLang]);
      }

      jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
        if (err) {
          throw new Error(statusMessages.TOKEN_NOT_VALID[prefLang]);
        }
      });

      const tokens = await O_Auth.findOne({ refresh_token });

      req.tokens = tokens;
      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
