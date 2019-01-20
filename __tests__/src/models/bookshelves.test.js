'use strict';

const rootDir = process.cwd();
const Bookshelf = require(`${rootDir}/src/models/bookshelves.js`);

describe('Categories Model', () => {
  it('can post() a new cateogory', () => {
    let obj = {name:'Towel', type: 'Paper'};
    let categories = new Bookshelf();
    return categories.post(obj)
      .then(record => {
        Object.keys(obj).forEach(key =>{
          expect(record[0][key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e) );
  });

  it('can get() a category', () => {
    let obj = {name:'Towel', type: 'Paper'};
    let categories = new Bookshelf();
    return categories.post(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key =>{
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  
});