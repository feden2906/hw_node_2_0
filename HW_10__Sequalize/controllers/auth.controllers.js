const { passwordHasher, tokenizer } = require('../helpers');
const { statusCodes } = require('../constants');
const { authService } = require('../services');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { body, query: { prefLang = 'en' }, profile: { id, password } } = req;

      await passwordHasher.compare(body.password, password, prefLang);

      const tokens = tokenizer();

      await authService.saveTokenToBD({ ...tokens, userID: id });

      res.json(tokens);
    } catch (e) {
      next(e);
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
