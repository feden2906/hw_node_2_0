const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwUser } = require('../middlewares');

router.get('/', userControllers.getAllUsers);
router.post('/', mwUser.isUserExist, mwUser.isUserVal, userControllers.createUser);

router.get('/:userID', mwUser.isIdVal, userControllers.getUserById);
router.put('/:userID', mwUser.isIdVal, mwUser.isUserVal, userControllers.updateUser);
router.delete('/:userID', mwUser.isIdVal, userControllers.deleteUser);

module.exports = router;
