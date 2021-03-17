const router = require('express').Router();

// const authRouter = require('./auth.routers');
const studentsRouter = require('./students.routers');
// const userRouter = require('./user.routers');

router.use('/students', studentsRouter);
// router.use('/login', authRouter);
// router.use('/users', userRouter);

module.exports = router;
