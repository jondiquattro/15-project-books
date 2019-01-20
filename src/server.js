'use Strict';

const express = require('express');

const methodOverride = require('./middleware/method-override');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/error');

const DB = process.env.DB||'pg';
console.log(DB);
const bookApp = require(`./routes/book-app-${DB}.js`);



//application Set Up
const app = express();
const server = {
  start: (port = process.env.PORT) => app.listen(port, ()=>console.log(`server Up On ${port}`))
};

module.exports = {app,server}//exports server and app



app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


//middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride);
app.use(express.static('public'));


//routes
app.use(bookApp);

//fallbacks
app.get('*', notFoundHandler);
app.use(errorHandler);