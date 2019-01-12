'use strict';

module.exports = (req,res,next) => {//req.params contains whatever variable is entered into the request ie categories
  let modelName = req.params.model;
  // console.log(modelName);
  req.model = require(`../models/${modelName}.js`);
  // console.log(req.model);
  next();
}
