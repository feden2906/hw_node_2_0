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
      const { avatar, docs, videos, body, body: { name, email, password }, query: { prefLang = 'en' } } = req;

      const hashPassword = await passwordHasher.hash(password);

      const user = await userService.createUser({ ...body, password: hashPassword });
      // const itemID = user._id.toString();

      // if (avatar) {
      //   const { finalPath, pathForDB, fullDirPath } = utils._filesDirBuilder(avatar.name, itemID, USERS, PHOTOS);
      //
      //   await fs.mkdir(fullDirPath, { recursive: true });
      //   await avatar.mv(finalPath);
      //   await userService.updateUser(itemID, { avatar: pathForDB });
      // }

      // if (docs.length) {
      //   const pathArr = await utils._filesListSaver(docs, itemID, USERS, DOCS);
      //   await userService.updateUser(itemID, { docs: pathArr });
      // }

      // if (videos.length) {
      //   const pathArr = await utils._filesListSaver(videos, itemID, USERS, VIDEOS);
      //   await userService.updateUser(itemID, { docs: pathArr });
      // }

      // await mailService.sendMail(email, emailActionsEnum.WELCOME, { name });

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

      await mailService.sendMail(email, emailActionsEnum.DELETE_ACCOUNT, { name });

      res.json(statusMessages.USER_WAS_DELETED[prefLang]);
    } catch (e) {
      next(e);
    }
  }
};
