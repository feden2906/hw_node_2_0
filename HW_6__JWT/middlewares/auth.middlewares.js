const { User } = require('../models');
const { statusCodes, statusMessages } = require('../constants');

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
  }
};
