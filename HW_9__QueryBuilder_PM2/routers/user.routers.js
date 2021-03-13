const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwAuth, mwFile, mwUser, mwUrl } = require('../middlewares');

router.route('/')
    .get(mwUrl.checkUserQuery,
      userControllers.getAllUsers)

    .post(mwFile.checkFile,
      mwFile.checkAvatar,
      mwUrl.checkUserQuery,
      mwUser.isUserExist,
      mwUser.isUserVal,
      userControllers.createUser);

router.route('/:userID')
    .get(mwUrl.checkUserQuery,
      userControllers.getUserById)

    .put(mwUrl.checkUserQuery,
      mwAuth.checkAccessToken,
      mwAuth.isAvailable,
      mwUser.isUserVal,
      userControllers.updateUser)

    .delete(mwUrl.checkUserQuery,
      mwAuth.checkAccessToken,
      mwAuth.isAvailable,
      userControllers.deleteUser);

router.param('userID', mwUser.findUserById);

module.exports = router;
