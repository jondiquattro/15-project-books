'use strict';

const express = require('express');

const Players = require('../models/players.js');
const players = new Players();

const router = express.Router();

// ROUTES
router.get('/api/v1/players', getPlayers);
router.post('/api/v1/players', postPlayers);

router.get('/api/v1/players/:id', getPlayer);
router.put('/api/v1/players/:id', putPlayers);
router.delete('/api/v1/players/:id', deletePlayers);

// FUNCTIONS
function getPlayers(request,response,next) {
  players.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getPlayer(request,response,next) {
  players.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function postPlayers(request,response,next) {
  players.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


function putPlayers(request,response,next) {
  players.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deletePlayers(request,response,next) {
  players.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
