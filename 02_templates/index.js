// Importieren von Code-Bibliotheken
var express = require('express');

var app = express();
var port = 3000;

// Konfiguration und Einstellungen

// Routen
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
