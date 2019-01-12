'use strict'

function createSearch(req, res) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  
    if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
    if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }
  
    superagent.get(url)
    .then(console.log(res.body))

      .catch(err => handleError(err, res));
  }





module.exports = createSearch