const { statusCodes, statusMessages } = require('../constants');
const { User } = require('../models');

module.exports = {
  isUserExist: async (req, res, next) => {
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
