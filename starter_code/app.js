const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

// add the routes here
app.get('/', (req, res) => res.render('index'));

const beer = {
  name: 'hola',
  description: 'Chao',
  tagline: 'hola',
  image_url: ''
};

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers(5)
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render('random-beer', beers[0]);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
