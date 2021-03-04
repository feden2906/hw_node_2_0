const router = require('express').Router();

const { authControllers } = require('../controllers');
const { mwUser, mwUrl } = require('../middlewares');

router.route('/')
    .post(mwUrl.checkQuery, mwUser.isUserExistForAuth, authControllers);

router.param('userID', mwUser.findUserById);

module.exports = router;
