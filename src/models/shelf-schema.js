'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const shelf = mongoose.Schema({
  id: { type:String, required:true },
  name: { type:String}
});

module.exports = mongoose.model('shelf', shelf);
