const bcrypt = require('bcrypt');

const { statusMessages } = require('../constants');

module.exports = {
  hash: (password) => bcrypt.hash(password, 12),
  compare: async (password, hashPassword, prefLang) => {
    const isPasswordEquals = await bcrypt.compare(password, hashPassword); // TODO  compare

    if (!isPasswordEquals) {
      throw new Error(statusMessages.WRONG_EMAIL_OR_PASSWORD[prefLang]);
    }
  }
};
