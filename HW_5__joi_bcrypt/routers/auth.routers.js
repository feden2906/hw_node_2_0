const router = require('express').Router();

const { authControllers } = require('../controllers');

router.post('/', authControllers.authUser);

module.exports = router;
