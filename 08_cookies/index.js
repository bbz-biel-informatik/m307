// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');
var cookieParser = require('cookie-parser');                    /* start=4 */

var app = express();
var port = 3000;

// Konfiguration und Einstellungen
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(cookieParser());                                        /* start=5 */

// Routen
app.get('/', (req, res) => {
  res.render('index');                                          /* start=1, end=8 */
  res.render('index', { farbe: req.cookies['color'] });         /* start=8 */
});

app.post('/setcolor', (req, res) => {                           /* start=7 */
  res.cookie('color', req.body.farbe);                          /* start=7 */
  res.redirect('/');                                            /* start=7 */
});                                                             /* start=7 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
