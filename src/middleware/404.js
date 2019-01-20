'use strict';

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found 401' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
