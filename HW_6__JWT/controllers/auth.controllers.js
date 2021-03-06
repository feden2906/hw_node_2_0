const { passwordHasher, tokenizer } = require('../helpers');
const { statusCodes } = require('../constants');
const { authService } = require('../services');

module.exports = {
  authUser: async (req, res) => {
    try {
      const { body: { password }, query: { prefLang = 'en' }, profile } = req;

      await passwordHasher.compare(password, profile.password, prefLang);

      const tokens = tokenizer();

      await authService.saveTokenToBD(tokens, profile._id);

      res.json(tokens);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  updateTokens: async (req, res) => {
    try {
      const { query: { prefLang = 'en' }, tokens: { userID } } = req;

      const tokens = tokenizer();

      await authService.updateTokens(tokens, userID);

      res.json(tokens);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
