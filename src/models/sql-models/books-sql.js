'use strict';

const booksSchema = require('./books-schema-sql')

const DataModel = require('./sql-model.js') 


class Books extends DataModel {}

//pipes query result to 
module.exports = new Books(booksSchema);