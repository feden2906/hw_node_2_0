const router = require('express').Router();

const userRouter = require('./user.routers');
const carRouter = require('./car.routers');

router.use('/cars', carRouter);
router.use('/users', userRouter);

module.exports = router;
