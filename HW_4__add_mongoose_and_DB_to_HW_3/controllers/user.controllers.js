const userService = require('../services/user.services');
const statusCodes = require('../constants/statusCodes.enum');
const statusMessages = require('../constants/statusMessages');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const { prefLang = 'en' } = req.query;

      const users = await userService.findAllUsers(prefLang);

      res.json(users);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  getUserById: async (req, res) => {
    try {
      const { params: { userID }, query: { prefLang = 'en' } } = req;

      const user = await userService.findUserById(userID, prefLang);

      res.json(user);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  createUser: async (req, res) => {
    try {
      const { body, query: { prefLang = 'en' } } = req;

      await userService.createUser(body, prefLang);

      res.status(statusCodes.CREATED).json(statusMessages.USER_IS_CREATED[prefLang]);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { params: { userID }, query: { prefLang = 'en' } } = req;

      await userService.deleteUser(userID);

      res.json(statusMessages.USER_WAS_DELETED[prefLang]);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
