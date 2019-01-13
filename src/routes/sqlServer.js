'use strict';

// application Dependencies
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');   //garbage

const router = express.Router();

// const PORT = process.env.PORT || 3000;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// application Middleware
router.use(express.urlencoded({extended:true}));
router.use(express.static('public'));

router.use(methodOverride((req, res, next) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}))

// Set the view engine for server-side templating
// router.set('view engine', 'ejs');

// API Routes
router.get('/api/v1', getBooks);
router.post('api/v1/searches', createSearch);
router.get('api/v1/searches/new', newSearch);
router.get('api/v1/books/:id', getBook);
router.post('api/v1/books', createBook);
router.put('api/v1/books/:id', updateBook);
router.delete('api/v1/books/:id', deleteBook);

router.get('*', (req, res) => res.status(404).send('This route does not exist'));

// router.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

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

function getBooks(req, res, next) {
    console.log('called from static')
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then(results => {
      if(results.rows.rowCount === 0) {
        res.render('pages/searches/new');
      } else {
        res.render('pages/index', {books: results.rows})
      }
    })
    .catch(err => handleError(err, res),next);
}

function createSearch(req, res, next) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }

  superagent.get(url)
    .then(apires => apires.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => res.render('pages/searches/show', {results: results}))
    .catch(err => handleError(err, res), next);
}

function newSearch(req, res, next) {
  res.render('pages/searches/new');
  next;
}

function getBook(req, res, next) {
  getBookshelves()
    .then(shelves => {
      // let SQL = 'SELECT * FROM books WHERE id=$1;';
      let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
      let values = [req.params.id];
      client.query(SQL, values)
        .then(result => res.render('pages/books/show', {book: result.rows[0], bookshelves: shelves.rows}))
        .catch(err => handleError(err, res),next);
    })
}

function getBookshelves() {
  // let SQL = 'SELECT DISTINCT bookshelf FROM books ORDER BY bookshelf;';
  let SQL = 'SELECT * FROM bookshelves ORDER BY name;';

  return client.query(SQL);
}

function createShelf(shelf) {
  let normalizedShelf = shelf.toLowerCase();
  let SQL1 = `SELECT id from bookshelves where name=$1;`;
  let values1 = [normalizedShelf];

  return client.query(SQL1, values1)
    .then(results => {
      if(results.rowCount) {
        return results.rows[0].id;
      } else {
        let INSERT = `INSERT INTO bookshelves(name) VALUES($1) RETURNING id;`;
        let insertValues = [shelf];

        return client.query(INSERT, insertValues)
          .then(results => {
            return results.rows[0].id;
          })
      }
    })
}

function createBook(req, res, next) {
  createShelf(req.body.bookshelf)
    .then(id => {
      let {title, author, isbn, image_url, description} = req.body;
      let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
      let values = [title, author, isbn, image_url, description, id];

      client.query(SQL, values)
        .then(result => res.redirect(`/books/${result.rows[0].id}`))
        .catch(err => handleError(err, res), next);
    })

}

function updateBook(req, res, next) {
  let {title, author, isbn, image_url, description, bookshelf_id} = req.body;
  // let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf=$6 WHERE id=$7;`;
  let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
  let values = [title, author, isbn, image_url, description, bookshelf_id, req.params.id];

  client.query(SQL, values)
    .then(res.redirect(`/books/${req.params.id}`))
    .catch(err => handleError(err, res),next);
}

function deleteBook(req, res, next) {
  let SQL = 'DELETE FROM books WHERE id=$1;';
  let values = [req.params.id];

  return client.query(SQL, values)
    .then(res.redirect('/'))
    .catch(err => handleError(err, res),next);
}

function handleError(error, res) {
  res.render('pages/error', {error: error});
}

module.exports = router;