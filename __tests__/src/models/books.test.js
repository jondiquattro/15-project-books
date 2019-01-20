'use strict';

const rootDir = process.cwd();
const Book = require(`${rootDir}/src/models/books.js`);

const supergoose = require('../supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

xdescribe('Products Model', () => {
  it('can post() a new product', () => {
    let obj = {name:'Towel', type: 'Paper', price: '4'};
    let products = new Book();
    return products.post(obj)
      .then(record => {
        Object.keys(obj).forEach(key =>{
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a product', () => {
    let obj = {name:'Towel', type: 'Paper', price: '4'};
    let products = new Book();
    return products.post(obj)
      .then(record => {
        return products.get(record._id)
          .then(product => {
            Object.keys(obj).forEach(key =>{
              expect(product[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  
});