'use strict';
////////////////notes///////////////////
// express sees two paths with the same amount of variables as the same thing, so you need to use a "?", which
// will make it a query that can be accessed with req,params.query.variable use an ampersand between variables

////////example
//router.get('api/v1/?model/&lat/&long') //req.params would contain all the 
//or you could make a seperate router for each thing.


///////////////////////////////////////
const express = require('express');


//////NEW///////////--diquattro
// const routeFinder = require('../middleware/route-finder');

const modelFinder = require('../middleware/model-finder.js');

const router = express.Router();

///////NEW//////////-diquattro
// router.param('route', routeFinder);
router.param('model', modelFinder);


////////NEW ///////-diquattro
// router.post('/api/v1/:route', createSearch)

// ROUTES
router.get('/api/v1/',renderHome);
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);
router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);


router.get('api/v1/:model/:lat/:long') //req.params would contain all the 
// FUNCTIONS

function renderHome(req,res,next){
  console.log('called from render');
  res.render('../../views/pages/index')
  // const x = require('../../views/pages/index.ejs')
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

  req.model.get()//model is the class constructor ie team, product, category etc etv
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.render('pages/index');
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
    console.log('called from handle post');
    console.log(req.model)

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

///////////////////////////test stuff////////
function createSearch(req, res) {
  console.log(req.body)
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }

  superagent.get(url)
    // .then(console.log(bookResult.volumeInfo))
    .then(apires => apires.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => res.render('pages/searches/show', {results: results}))
    .catch(err => handleError(err, res));
}





module.exports = router;