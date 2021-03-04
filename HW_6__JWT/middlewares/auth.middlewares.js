const jwt = require('jsonwebtoken');

const { User, O_Auth } = require('../models');
const { statusCodes, statusMessages, constants } = require('../constants');
const { JWT_SECRET } = require('../configs/configs');

module.exports = {
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
          throw new Error(statusMessages.TOKEN_NOT_VALID[prefLang]);
        }
      });

      const tokens = await O_Auth.findOne({ access_token }).populate('userID');

      if (!tokens) {
        throw new Error(statusMessages.TOKEN_NOT_VALID[prefLang]);
      }

      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
