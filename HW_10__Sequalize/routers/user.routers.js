const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwAuth, mwFile, mwUser, mwUrl } = require('../middlewares');

router.route('/')
    .get(mwUrl.checkUserQuery,
      userControllers.getUsers)

    .post(mwUrl.disableQuery,
      // mwFile.checkFile,
      // mwFile.checkAvatar,
      mwUser.isUserExist,
      mwUser.isUserVal,
      userControllers.createUser);

router.route('/:userID')
    .get(mwUrl.disableQuery,
      userControllers.getUserById)

    .put(mwUrl.disableQuery,
      mwAuth.checkAccessToken,
      mwAuth.isAvailable,
      mwUser.isUserVal,
      userControllers.updateUser)

    .delete(mwUrl.disableQuery,
      mwAuth.checkAccessToken,
      mwAuth.isAvailable,
      userControllers.deleteUser);

router.param('userID', mwUser.findUserById);

module.exports = router;
