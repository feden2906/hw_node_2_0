const path = require('path');
const fs = require('fs-extra').promises;
const uuid = require('uuid').v1;

const { passwordHasher } = require('../helpers');
const { statusCodes, statusMessages, emailActionsEnum } = require('../constants');
const { userService, mailService } = require('../services');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const { prefLang = 'en', ...rest } = req.query;

      const users = await userService.findAllUsers(rest);

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { params: { userID }, query: { prefLang = 'en' } } = req;

      const user = await userService.findUserById(userID, prefLang);

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { avatar, body, body: { name, email, password }, query: { prefLang = 'en' } } = req;

      const hashPassword = await passwordHasher.hash(password);

      const user = await userService.createUser({ ...body, password: hashPassword });

      if (avatar) {
        const pathWithoutPublic = path.join('user', user._id.toString(), 'photos');
        const photosDir = path.join(process.cwd(), 'public', pathWithoutPublic);
        const fileExtension = path.extname(avatar.name);
        const photoName = uuid() + fileExtension;
        const finalPhotoPath = path.join(photosDir, photoName);
        const pathPhotoForDB = path.join(pathWithoutPublic, photoName);

        await fs.mkdir(photosDir, { recursive: true });
        await avatar.mv(finalPhotoPath);
        await userService.updateUser(user._id, { avatar: pathPhotoForDB });
      }

      await mailService.sendMail(email, emailActionsEnum.WELCOME, { name });

      res.status(statusCodes.CREATED).json(statusMessages.USER_IS_CREATED[prefLang]);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { body, body: { name, email, password }, params: { userID }, query: { prefLang = 'en' } } = req;

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
      const { params: { userID }, query: { prefLang = 'en' } } = req;

      const { name, email } = await userService.deleteUser(userID);

      await userService.deleteUser(userID);

      await mailService.sendMail(email, emailActionsEnum.DELETE_ACCOUNT, { name });

      res.json(statusMessages.USER_WAS_DELETED[prefLang]);
    } catch (e) {
      next(e);
    }
  }
};


