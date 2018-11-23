const { Router } = require('express');
const Player = require('../models/player');
const { validatePlayer } = require('../modules/validate');

const router = new Router();

router.post('/players', validatePlayer, async (req, res) => {
  const user = req.user;
  let player;
  try {
    player = await Player.create({ ...req.body, created_by: user.userId });
  } catch (e) {
    return res.status(409).json({ success: false, error: e.message });
  }
  res.status(201).json({ success: true, player });
});

module.exports = router;
