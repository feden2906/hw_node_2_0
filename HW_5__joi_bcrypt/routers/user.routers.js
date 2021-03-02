const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwUser } = require('../middlewares');

router.get('/', userControllers.getAllUsers);
router.post('/', mwUser.isNameVal, mwUser.isEmailVal, mwUser.isPassVal, mwUser.isAgeVal, userControllers.createUser);
router.get('/:userID', mwUser.isIdVal, userControllers.getUserById);
router.delete('/:userID', mwUser.isIdVal, userControllers.deleteUser);

module.exports = router;
