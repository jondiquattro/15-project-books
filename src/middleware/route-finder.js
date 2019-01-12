'use strict';

//this needs to make the render and serches happen


module.exports = (req,res,next) => {//req.params contains whatever variable is entered into the request ie categories
    let routeName = req.params.route;
    req.route = require(`../routes/${routeName}.js`)
    
  next();
}
