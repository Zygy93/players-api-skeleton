const { Router } = require('express');
const userRouter = require('./user');

const router = new Router();

router.use('/api', userRouter);

module.exports = router;