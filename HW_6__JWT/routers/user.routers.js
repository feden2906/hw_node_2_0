const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwUser, mwUrl } = require('../middlewares');

router.route('/')
    .get(mwUrl.checkQuery, userControllers.getAllUsers)
    .post(mwUrl.checkQuery, mwUser.isUserExist, mwUser.isUserVal, userControllers.createUser);

router.route('/:userID')
    .get(mwUrl.checkQuery, userControllers.getUserById)
    .put(mwUrl.checkQuery, mwUser.isUserVal, userControllers.updateUser)
    .delete(mwUrl.checkQuery, userControllers.deleteUser);

router.param('userID', mwUser.findUserById);

module.exports = router;
