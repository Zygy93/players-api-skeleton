const { Router } = require('express');
const userRouter = require('./user');
const playerRouter = require('./player');

const router = new Router();

router.use('/api', userRouter);
router.use('/api', playerRouter);


module.exports = router;