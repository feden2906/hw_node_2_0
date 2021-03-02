const router = require('express').Router();

const { authControllers } = require('../controllers');
const { mwAuth } = require('../middlewares');

router.post('/', mwAuth.isUserExist, authControllers.authUser);

module.exports = router;
