const { statusCodes } = require('../constants');
const { User } = require('../models');
const { passwordHasher } = require('../helpers');

module.exports = {
  authUser: async (req, res) => {
    try {


      const { body: { email, password }, query: { prefLang = 'en' } } = req;
      const user = await User.findOne({ email });
      await passwordHasher.compare(password, user.password, prefLang);



      res.json(user);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
