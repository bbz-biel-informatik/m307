// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express();
var port = 3000;

// Konfiguration und Einstellungen
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Routen
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/uebermich', (req, res) => {
  res.render('about');
});

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
