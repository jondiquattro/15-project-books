'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const books = mongoose.Schema({
  title: { type:String, required:true },
  author: { type:String, required:true },
  isbn: { type:String, required:true },
  image_url: { type:String, required:true },
  description: { type:String, required:true },
  bookshelf_id: { type:String, required:true },
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}});

// products.virtual('categories', {
//   ref: 'categories',
//   localField: 'name',
//   foreignField: 'type',
//   justOne: false,
// });

// products.pre('find', function (){
//   try {
//     this.populate('categories');
//   }
//   catch(e) {console.log('find', e); }
// });

module.exports = mongoose.model('books', books);
