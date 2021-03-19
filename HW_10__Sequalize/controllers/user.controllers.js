const fs = require('fs-extra').promises;

const { passwordHasher } = require('../helpers');
const {
  directoryName: {
    USERS, DOCS, PHOTOS, VIDEOS
  }, statusCodes, statusMessages, emailActionsEnum
} = require('../constants');
const { userService, mailService } = require('../services');

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.findUsers(req.query);

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const user = req.profile;

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { body, body: { name, email, password }, query: { prefLang = 'en' } } = req;

      const hashPassword = await passwordHasher.hash(password);

      await userService.createUser({ ...body, password: hashPassword });

      await mailService.sendMail(email, emailActionsEnum.WELCOME, { name });

      res.status(statusCodes.CREATED).json(statusMessages.USER_IS_CREATED[prefLang]);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {
        body, body: { name, email, password }, params: { userID }, query: { prefLang = 'en' }
      } = req;

      const hashPassword = await passwordHasher.hash(password);

      await userService.updateUser(userID, { ...body, password: hashPassword });

      await mailService.sendMail(email, emailActionsEnum.CHANGE_INFO, { name });

      res.json(statusMessages.USER_WAS_UPDATE[prefLang]);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { profile: { email, name }, params: { userID }, query: { prefLang = 'en' } } = req;

      await userService.deleteUser(userID);

      await userService.deleteUser(userID);

      await mailService.sendMail(email, emailActionsEnum.DELETE_ACCOUNT, { name });

      res.json(statusMessages.USER_WAS_DELETED[prefLang]);
    } catch (e) {
      next(e);
    }
  }
};
