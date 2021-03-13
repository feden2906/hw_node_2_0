const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwAuth, mwFile, mwUser, mwUrl } = require('../middlewares');

router.route('/')
    .get(mwUrl.checkQuery, userControllers.getAllUsers)
    .post(mwFile.checkFile, mwFile.checkAvatar, mwUrl.checkQuery, mwUser.isUserExist, mwUser.isUserVal, userControllers.createUser);

router.route('/:userID')
    .get(mwUrl.checkQuery, userControllers.getUserById)
    .put(mwUrl.checkQuery, mwAuth.checkAccessToken, mwAuth.isAvailable, mwUser.isUserVal, userControllers.updateUser)
    .delete(mwUrl.checkQuery, mwAuth.checkAccessToken, mwAuth.isAvailable, userControllers.deleteUser);

router.param('userID', mwUser.findUserById);

module.exports = router;
