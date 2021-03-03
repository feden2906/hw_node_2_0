const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwUser } = require('../middlewares');

router.route('/')
    .get(userControllers.getAllUsers)
    .post(mwUser.isUserExist, mwUser.isUserVal, userControllers.createUser);

router.route('/login')
    .post(mwUser.isUserExistForAuth, userControllers.authUser);

router.route('/:userID')
    .get(userControllers.getUserById)
    .put(mwUser.isUserVal, userControllers.updateUser)
    .delete(userControllers.deleteUser);

router.param('userID', mwUser.findUserById);

module.exports = router;
