const { utils, passwordHasher } = require('../helpers');
const { statusCodes } = require('../constants');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { body, query: { prefLang = 'en' }, profile: { id, password } } = req;

      await passwordHasher.compare(body.password, password, prefLang);

      const tokens = await utils._saveTokensToBD(id);

      res.json(tokens);
    } catch (e) {
      next(e);
    }
  },

  updateTokens: async (req, res) => {
    try {
      const { userID } = req.tokens;

      const tokens = await utils._saveTokensToBD(userID);

      res.json(tokens);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
