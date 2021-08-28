// Importieren von Code-Bibliotheken
var express = require('express');

var app = express();
var port = 3000;

// Konfiguration und Einstellungen

// Routen
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contact', (req, res) => {                                     /* start=2 */
  res.send('BBZ Biel, Wasenstrasse 5, 2502 Biel');                      /* start=2 */
});                                                                     /* start=2 */


// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
