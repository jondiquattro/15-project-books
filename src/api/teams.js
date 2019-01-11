'use strict';

const express = require('express');

const Teams = require('../models/teams.js');
const teams = new Teams();

const router = express.Router();

// ROUTES
router.get('/api/v1/teams', getTeams);
router.post('/api/v1/teams', postTeam);

router.get('/api/v1/teams/:id', getTeam);
router.put('/api/v1/teams/:id', putTeam);
router.delete('/api/v1/teams/:id', deleteTeam);

// FUNCTIONS
function getTeams(request,response,next) {
  teams.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getTeam(request,response,next) {
  teams.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function postTeam(request,response,next) {
  teams.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


function putTeam(request,response,next) {
  teams.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteTeam(request,response,next) {
  teams.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
