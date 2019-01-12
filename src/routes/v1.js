'use strict';

const express = require('express');
const modelFinder = require('../middleware/model-finder');
const router = express.Router();

router.param('model', modelFinder);

// routes
router.get('api/v1/:model', handleGetAll);

function handleGetAll(req,res,next) {
  req.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch( next );
}
