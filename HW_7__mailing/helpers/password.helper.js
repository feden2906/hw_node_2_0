const bcrypt = require('bcrypt');

const { statusCodes, statusMessages } = require('../constants');
const ErrorHandler = require('./errorHandler');

module.exports = {
  hash: (password) => bcrypt.hash(password, 12),

  compare: async (password, hashPassword, prefLang) => {
    const isPasswordEquals = await bcrypt.compare(password, hashPassword);

    if (!isPasswordEquals) {
      throw new ErrorHandler(statusMessages.WRONG_EMAIL_OR_PASSWORD[prefLang], statusCodes.BAD_REQUEST);
    }
  }
};
