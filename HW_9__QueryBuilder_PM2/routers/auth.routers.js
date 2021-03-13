const router = require('express').Router();

const { authControllers } = require('../controllers');
const { mwAuth } = require('../middlewares');

router.route('/')
    .post(mwAuth.isUserExistForAuth, authControllers.authUser);

router.route('/refreshToken')
    .post(mwAuth.checkRefreshToken, authControllers.updateTokens);

module.exports = router;
