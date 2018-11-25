const { Router } = require('express');
const Player = require('../models/player');
const { validatePlayer } = require('../modules/validate');

const router = new Router();

//Router to create a player from a user
router.post('/players', validatePlayer, async (req, res) => {
  //valdiates the PLayer information first before doing the AJAX request
  const user = req.user;
  //Grabs the UserId and token
  let player;
  try {
    player = await Player.create({ ...req.body, created_by: user.userId });
    //Creates the player by sending the request
  } catch (e) {
    return res.status(409).json({ success: false, error: e.message });
    //Sends error message
  }
  res.status(201).json({ success: true, player });
  //Successfully created a player
});// End POST request

//Router to delete players
router.use('/players/:id', async (req, res) => {
  const user = req.user;
  //Grabs the UserId and token
  const playerId = req.params.id;
  //Grabs the playerId
  try {
    await Player.deleteById({ playerId, userId: user.userId });
    //Async request to delete player by playerId
  } catch (e) {
    return res.status(404).json({ success: false, error: e.message });
    //Catches the error
  }
  res.status(200).json({ success: true });
  //Deleting player was successful
});// End USE request

//Router to get players
router.get('/players', async (req, res) => {
  const user = req.user;
  //Grabs the UserId and token
  const players = await Player.findPlayersForUser(user.userId);
  //Sends the userId to get the players associated with the Id
  res.status(200).json({ success: true, players });
  //Successfuly got the players
});// End GET request


module.exports = router;
//Exports player router
