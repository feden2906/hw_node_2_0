const router = require('express').Router();

const carRouter = require('./car.routers');
const userRouter = require('./user.routers');

router.use('/users', userRouter);
router.use('/cars', carRouter);

module.exports = router;
