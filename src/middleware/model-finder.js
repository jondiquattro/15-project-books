'use strict';

module.exports = (req,res,next) => {//req.params contains whatever variable is entered into the request ie categories
  console.log('called from mdels finder')

  // let modelName = req.params.model;
  // req.model = require(`../models/${modelName}.js`);
  
  next();
}
