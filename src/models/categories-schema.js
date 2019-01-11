'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const categories = mongoose.Schema({
  name: { type:String, required:true },
  type: { type:String, required:true },
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}} );

categories.virtual('products', {
  ref: 'products',
  localField: 'price',
  foreignField: 'type',
  justOne: false,
});

categories.pre('find', function() {
  try {
    
  }
  catch(e) {console.log('find', e); }
});

categories.pre('find', function (){
  try {
    this.populate('products');
    
  }
  catch(e) {console.log('find', e); }
});

module.exports = mongoose.model('categories', categories);