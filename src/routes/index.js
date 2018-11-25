const { Router } = require('express');
const userRouter = require('./user');
const playerRouter = require('./player');
//Creates the Router Callback, User, and Player router

const router = new Router();

router.use('/api', userRouter);
router.use('/api', playerRouter);
//Let's us use the User and Player Router

module.exports = router;
//exports the router