const { statusCodes, statusMessages } = require('../constants');
const { passwordHasher } = require('../helpers');

module.exports = {
  authUser: async (req, res) => {
    try {
      const { body: { password }, query: { prefLang = 'en' }, profile } = req;

      await passwordHasher.compare(password, profile.password, prefLang);

      res.json(statusMessages.AUTH_USER[prefLang]);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
