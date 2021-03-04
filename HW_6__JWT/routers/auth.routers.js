const router = require('express').Router();

const { authControllers } = require('../controllers');
const { mwAuth, mwUrl } = require('../middlewares');

router.route('/')
    .post(mwUrl.checkQuery, mwAuth.isUserExistForAuth, authControllers.authUser);

module.exports = router;
