'use strict';
////////////////notes///////////////////
// express sees two paths with the same amount of variables as the same thing, so you need to use a "?", which
// will make it a query that can be accessed with req,params.query.variable use an ampersand between variables

////////example
//router.get('api/v1/?model/&lat/&long') //req.params would contain all the 
//or you could make a seperate router for each thing.


///////////////////////////////////////
const express = require('express');
const modelFinder = require('../middleware/model-finder.js');

const router = express.Router();
router.param('model', modelFinder);

// ROUTES
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);

router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);


router.get('api/v1/:model/:lat/:long') //req.params would contain all the 
// FUNCTIONS

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

 //watch 0954 video
function handleGetAll(req,res,next) {
  req.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch( next );
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleGetOne (req,res,next) {
  req.model.get(req.params.id)
    .then( result => res.status(200).json(result[0]) )
    .catch( next );
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handlePost (req,res,next) {
    console.log('in handle post');
  req.model.post(req.body)
    .then( result => res.status(200).json(result) )
    .catch( next );
}


/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handlePut (req,res,next) {
  req.model.put(req.params.id, req.body)
    .then( result => res.status(200).json(result) )
    .catch( next );
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function handleDelete (req,res,next) {
  req.model.delete(req.params.id)
    .then( result => res.status(200).json(result) )
    .catch( next );
}

module.exports = router;