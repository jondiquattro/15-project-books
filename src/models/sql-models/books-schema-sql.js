'use strict';


//this is the schema that will hold the sql
// const mongoose = require('mongoose');
// require('mongoose-schema-jsonschema')(mongoose);


require('dotenv').config();
const pg = require('pg');


//should result in an sql object that can be parsed
let SQL = 'SELECT * FROM bookshelves ORDER BY name;';

//this should feed the results of this query to the 
module.exports = client.query(SQL)






