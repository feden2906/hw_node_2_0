const router = require('express').Router();

const authRouter = require('./auth.routers');
const carRouter = require('./car.routers');
const userRouter = require('./user.routers');

router.use('/cars', carRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
