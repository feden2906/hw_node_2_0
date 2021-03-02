const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwUser, mwUrl } = require('../middlewares');

router.route('/')
    .get(userControllers.getAllUsers)
    .post(mwUser.isUserExist, mwUser.isUserVal, userControllers.createUser);

router.route('/:userID')
    .get(mwUrl.isIdVal, userControllers.getUserById)
    .put(mwUrl.isIdVal, mwUser.isUserVal, userControllers.updateUser)
    .delete(mwUrl.isIdVal, userControllers.deleteUser);

module.exports = router;
