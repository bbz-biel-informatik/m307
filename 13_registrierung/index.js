// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');                 /* start=4 */

var Pool = require('pg').Pool;

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

app.get('/registration_form', function(req, res) {           /* start=5 */
  res.render('registration_form');                           /* start=5 */
});                                                   /* start=5 */

app.post('/register', function (req, res) {                         /* start=6 */
  var passwort = bcrypt.hashSync(req.body.passwort, 10);            /* start=6 */
  pool.query('INSERT INTO users (benutzername, passwort) VALUES ($1, $2)', /* start=7 */
   [req.body.benutzername, passwort], /* start=7 */
    (error, result) => {                                /* start=7 */
    if(error) { throw error; }                                      /* start=7 */
    res.redirect('/login_form');                                         /* start=7 */
  });                                                               /* start=7 */
});                                                                 /* start=6 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
