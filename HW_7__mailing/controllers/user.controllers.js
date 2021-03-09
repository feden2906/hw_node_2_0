const { passwordHasher } = require('../helpers');
const { statusCodes, statusMessages, emailActionsEnum } = require('../constants');
const { userService, mailService } = require('../services');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const { prefLang = 'en', ...rest } = req.query;

      const users = await userService.findAllUsers(rest);

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
      const { body, body: { name, email, password }, query: { prefLang = 'en' } } = req;

      const hashPassword = await passwordHasher.hash(password);

      await userService.createUser({ ...body, password: hashPassword });

      await mailService.sendMail(email, emailActionsEnum.WELCOME, { name });

      res.status(statusCodes.CREATED).json(statusMessages.USER_IS_CREATED[prefLang]);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { body, body: { name, email, password }, params: { userID }, query: { prefLang = 'en' } } = req;

      const hashPassword = await passwordHasher.hash(password);

      await userService.updateUser(userID, { ...body, password: hashPassword });

      await mailService.sendMail(email, emailActionsEnum.CHANGE_INFO, { name });

      res.json(statusMessages.USER_WAS_UPDATE[prefLang]);
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
