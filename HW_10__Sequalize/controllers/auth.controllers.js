const { passwordHasher, tokenizer } = require('../helpers');
const { statusCodes } = require('../constants');
const { authService } = require('../services');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { body, query: { prefLang = 'en' }, profile: { id, password } } = req;

      await passwordHasher.compare(body.password, password, prefLang);

      const tokens = tokenizer();

      await authService.deleteTokens(id);

      await authService.saveTokenToBD({ ...tokens, userID: id });

      res.json(tokens);
    } catch (e) {
      next(e);
    }
  },

  updateTokens: async (req, res) => {
    try {
      const { userID } = req.tokens;

      const tokens = tokenizer();

      await authService.deleteTokens(userID);

      await authService.saveTokenToBD({ ...tokens, userID });

      res.json(tokens);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
