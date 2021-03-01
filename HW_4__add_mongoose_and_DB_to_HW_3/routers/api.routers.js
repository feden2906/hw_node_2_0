const router = require('express').Router();

const userRouter = require('./user.routers');
const carRouter = require('./car.routers');

router.use('/users', userRouter);
router.use('/cars', carRouter);

module.exports = router;
