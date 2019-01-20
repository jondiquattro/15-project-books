'use strict';

module.exports = (err, req, res, next) => {
    if (request.body && typeof request.body === 'object' && '_method' in request.body) {
        // look in urlencoded POST bodies and delete it
        let method = request.body._method;
        delete request.body._method;
        return method;

    }
  };
  