// controllers/user/index.js

var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

app.get('/user/new', function(request, response) {

  response.render('new');

});

app.post('/user', function(request, response) {

  var u = request.body;

  // podemos acceder a DB sin hacer
  // require porque es global
  var newUser = new db.User({
    name: u.name,
    birthdate: u.birthdate,
    isAdmin: u.isAdmin === 'on' ? true : false
  });

  // también podía hacer `new db.User(u)`
  // porque los campos del formulario
  // tienen el mismo nombre del las
  // propiedades del modelo. Para
  // efectos demostrativos aquí cree
  // un objeto con las mismas propiedades
  // y les asigné los valores que vienen
  // del formulario.

  newUser.save(function(error, user) {

    if (error) response.json(error);

    response.redirect('/user');

  });

});