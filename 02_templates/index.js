// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');          /* start=4 */

var app = express();
var port = 3000;

// Konfiguration und Einstellungen
app.engine('mustache', mustacheExpress());                  /* start=5 */
app.set('view engine', 'mustache');                         /* start=5 */
app.set('views', __dirname + '/views');                     /* start=5 */

// Routen
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/uebermich', (req, res) => {                       /* start=9 */
  res.render('about');                                      /* start=9 */
});                                                         /* start=9 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
