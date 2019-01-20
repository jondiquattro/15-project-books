'use strict';

// routerlication Dependencies
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');


// application Setup
const router = express.Router();

const books = require('../models/books.js');//need to come back to this
const bookshelves = require('../models/bookshelves.js');
const mongoose = require('mongoose');


const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);


// API Routes
router.get('/', getBooks);
router.post('/searches', createSearch);
router.get('/searches/new', newSearch);
router.get('/books/:id', getBook);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);


// HELPER FUNCTIONS
function Book(info) {
  let placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title || 'No title available';
  this.author = info.authors[0] || 'No authors available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail : placeholderImage;
  this.description = info.description || 'No description available';
  this.id = info.industryIdentifiers ? `${info.industryIdentifiers[0].identifier}` : '';
}

function getBooks(req, res, next) {//x
  console.log('called');

  books.find({})
  .then(results => {
    if(results.length) {
      res.render('pages/index', {books: results})
    } else {
      res.render('pages/searches/new');
    }
  })
  .catch(next);
}

function createSearch(req, res, next) {//x
  console.log('called from create search')
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => res.render('pages/searches/show', { results: results }))
    .catch(next);
}

function newSearch(req, res, next) {//x
  console.log('called from newsearch')
  res.render('pages/searches/new');
}

function getBook(req, res, next) {//x

  books.findById(req.params.id)

    .then(book => {
      console.log({book});
      return bookshelves.find()
        .then(shelves => res.render('pages/books/show', {
          book: book, bookshelves: shelves}))
    }).catch(next);
}


function createShelf(shelf) {//x
  let normalizedShelf = shelf.toLowerCase();


  return bookshelves.findOneAndUpdate(
    { bookshelf: normalizedShelf },
    { bookshelf: normalizedShelf },
    { upsert: true, new: true }
  );

}

function createBook(req, res, next) {//x
  createShelf(req.body.bookshelf)
    .then(shelf => {
      let record = req.body;
      record.bookshelf_id = shelf._id;
      let book = new books(record);
      book.save()
        .then(result => res.redirect(`/books/${result._id}`))
        .catch(next);
    })

}

function updateBook(req, res) {
  books.findByIdAndUpdate(req.params.id, req.body)
    .then(response.redirect(`/books/${req.params.id}`))
    .catch(next);
}

function deleteBook(req, res) {

  books.findByIdAndDelete(req.params.id, req.body)
    .then(res.redirect('/'))
    .catch(next);
}

module.exports = router;