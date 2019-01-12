'use strict';


//this is the schema that will hold the sql
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const products = mongoose.Schema({
  name: { type:String, required:true },
  type: { type:String, required:true },
  price: { type:Number, required:true },
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}});

products.virtual('categories', {
  ref: 'categories',
  localField: 'name',
  foreignField: 'type',
  justOne: false,
});

products.pre('find', function (){
  try {
    this.populate('categories');
  }
  catch(e) {console.log('find', e); }
});

module.exports = mongoose.model('products', products);