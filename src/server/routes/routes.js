const Game = require("../game/game")
const { Router } = require('express');
const router = Router();
const express = require('express');
const app = express();

//locals
app.locals.games = [];

router.get('/', (req, res) => {
   res.render('index')
})


router.post('/games', (req, res) => {
   let gameId = app.locals.games.length
   let level = req.body.gameLevel
   app.locals.games.push({ id: gameId, game: new Game(level) })
   res.json({ gameId })
})

router.post('/games/:gameId/attempt', (req, res) => {
   const userNumber = req.body.guessNumber;
   const level=req.body.gameLevel;
   if(level==3 && userNumber.length<6 ){
      return res.status(422).json({ error: 'The number must be 6 digits long' });
   }
   if(level==1  && userNumber.length<4 || level==2 && userNumber.length<4 ){
      return res.status(422).json({ error: 'The number must be 4 digits long' });
   }
   const gameId = req.params.gameId;
   let gameIndex = getGameIndex(gameId);
   if(gameIndex==undefined ){
      return res.status(404).json({ error: 'Game Not Found' });
   }
   let result = app.locals.games[gameIndex].game.createAttempt(userNumber,level);  
   res.json(result)
})

const getGameIndex = (id) => {
   let index;
   app.locals.games.forEach((game, i) => {
     if (game.id == id) {
       index = i;
     }
   })
   return index;
 }


module.exports = router;