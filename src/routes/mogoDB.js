'use strict';
console.log('hooked up');
const express = require('express');
const router = express.Router();


// ROUTESS
router.get('/', getBooks);
router.get('/api/v1:model', handleGetAll);
router.post('/api/v1:model', handlePost);
router.get('/api/v1:model/api/v1:id', handleGetOne);
router.put('/api/v1:model/api/v1:id', handlePut);
router.delete('/api/v1:model/:id', handleDelete);


router.get('api/v1/:model/:lat/:long') //req.params would contain all the 
// FUNCTIONS

function getBooks(req,res,next){
  console.log('called');
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

 //watch 0954 video
function handleGetAll(req,res,next) {
  console.log('handle get all')
  req.model.get()//model is the class constructor ie team, product, category etc etv
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
  console.log('handle get one')

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
    console.log('called from handle post');
    console.log(req.body)

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
  console.log('handle put')

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
  console.log('handle delete')

  req.model.delete(req.params.id)
    .then( result => res.status(200).json(result) )
    .catch( next );
}


module.exports = router;