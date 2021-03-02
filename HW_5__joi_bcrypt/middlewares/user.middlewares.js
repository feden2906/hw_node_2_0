const { User } = require('../models');
const { statusMessages, statusCodes } = require('../constants');
const { userValidators } = require('../validators');

module.exports = {
  isUserVal: (req, res, next) => {
    try {
      const { error } = userValidators.createUserValidator.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }

      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  isUserExist: async (req, res, next) => {
    try {
      const { body: { email }, query: { prefLang = 'en' } } = req;

      const user = await User.findOne({ email });

      if (user) {
        throw new Error(statusMessages.USER_IS_EXISTS[prefLang]);
      }

      next();
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
