'use strict';

module.exports = (req,res,next) => {//req.params contains whatever variable is entered into the request ie categories
    let modelName = req.params.model;
    req.model = require(`../models/${modelName}.js`);
    next();
}