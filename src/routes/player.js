const { Router } = require('express');
const Player = require('../models/player');
const { validatePlayer } = require('../modules/validate');

const router = new Router();


module.exports = router;
