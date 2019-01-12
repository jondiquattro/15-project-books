'use strict';

const productsSchema = require('./products-schema.js')

const DataModel = require('./model.js') 


class Products extends DataModel {}


module.exports = new Products(productsSchema);