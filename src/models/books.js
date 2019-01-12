'use strict';

const booksSchema = require('./books-schema.js')

const DataModel = require('./model.js') 


class Books extends DataModel {}


module.exports = new Books(booksSchema);
