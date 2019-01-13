'use strict';
console.log('hooked up from mongo');

const express = require('express');
const superagent = require('superagent');

const modelFinder = require('../middleware/model-finder.js');

const router = express.Router();
router.param('model', modelFinder);

// ROUTESS

router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);

// ///new paths////  -diquattro
router.get('/searches/new', newSearch);
router.post('/searches', createSearch);
//////////////////////////////////////


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
  //model is actually a class
  console.log('from handegetAll')
  req.model.get()
    .then( data => {
      // console.log('data', data.length)

      const output = {
        count: data.length,
        results: data,
      };
      if(output.count ===0){
        res.render('pages/searches/new');
      }
      else{
        res.render('pages/index', output.results )
      }
      
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


//////////////new function////////  diquattro
function newSearch(req, res, next) {
  console.log('called from newsaerch')
  res.render('pages/searches/new');
  next;
}

function createSearch(req, res, next) {
  console.log('//////////////////////////////////////')
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log('create search model',req.model);
  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }
  console.log(url);

  superagent.get(url)
  // .then(apires => apires.body.items.map(idx => {
  //   new Book(idx.volumeInfo);
  //   books.post(req.body)

  // }) )
     .then(apires => apires.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => res.render('pages/searches/show',{results: results}),next)
}

function newSearch(req, res, next) {
  res.render('pages/searches/new');
  next;
}


function Book(info) {
  let placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title || 'No title available';
  this.author = info.authors[0] || 'No authors available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail : placeholderImage;
  this.description = info.description || 'No description available';
  this.id = info.industryIdentifiers ? `${info.industryIdentifiers[0].identifier}` : '';
}


module.exports = router;