const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwUser, mwUrl, mwAuth } = require('../middlewares');

router.route('/')
    .get(mwUrl.checkQuery, userControllers.getAllUsers)
    .post(mwUrl.checkQuery, mwUser.isUserExist, mwUser.isUserVal, userControllers.createUser);

router.route('/:userID')
    .get(mwUrl.checkQuery, userControllers.getUserById)
    .put(mwUrl.checkQuery, mwAuth.checkAccessToken, mwUser.isUserVal, userControllers.updateUser)
    .delete(mwUrl.checkQuery, mwAuth.checkAccessToken, userControllers.deleteUser);

router.param('userID', mwUser.findUserById);

module.exports = router;
