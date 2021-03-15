const router = require('express').Router();

const { authControllers } = require('../controllers');
const { mwAuth, mwUrl } = require('../middlewares');

router.route('/')
    .post(mwUrl.disableQuery,
      mwAuth.isUserExistForAuth,
      authControllers.authUser);

router.route('/refreshToken')
    .post(mwUrl.disableQuery,
      mwAuth.checkRefreshToken,
      authControllers.updateTokens);

module.exports = router;
