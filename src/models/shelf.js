'use strict';

const shelfSchema = require('./shelf-schema.js')
console.log('called from shelf extends')
const DataModel = require('./model.js') 


class Shelf extends DataModel {}


module.exports = new Shelf(shelfSchema);
