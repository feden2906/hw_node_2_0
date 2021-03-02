const router = require('express').Router();

const userRouter = require('./user.routers');
const carRouter = require('./car.routers');
const authRouter = require('./auth.routers');

router.use('/cars', carRouter);
router.use('/login', authRouter);
router.use('/users', userRouter);

module.exports = router;
