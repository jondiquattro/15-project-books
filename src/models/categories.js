'use strict';

const categoriesSchema = require('./categories-schema.js')

const DataModel = require('./model.js') 
console.log('IN CATEGORY.JS');


class Categories extends DataModel {}

        

module.exports = new Categories(categoriesSchema);