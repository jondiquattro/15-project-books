'use strict';

const booksSchema = require('./books-schema.js')
console.log('called from books extends')
const DataModel = require('./model.js') 


class Books extends DataModel {}


module.exports = new Books(booksSchema);
