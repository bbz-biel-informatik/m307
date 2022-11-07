// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const sessions = require('express-session');                 /* start=4 */

var Pool = require('pg').Pool;

var app = express();
var port = 3000;

// Konfiguration und Einstellungen
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(sessions({                                      /* start=4 */
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",     /* start=4 */
  saveUninitialized: true,                              /* start=4 */
  cookie: { maxAge: 86400000, secure: false },          /* start=4 */
  resave: false                                         /* start=4 */
}));                                                    /* start=4 */

// Routen
app.get('/todos', (req, res) => {
  if(!req.session.benutzerid) { res.redirect('/login_form'); return; } /* start=8 */
  res.send('Hello World!');
});

app.get('/login_form', function(req, res) {           /* start=5 */
  res.render('login_form');                           /* start=5 */
});                                                   /* start=5 */

app.post('/login', function (req, res) {                                                                  /* start=6 */
  pool.query('SELECT * FROM users WHERE benutzername = ? ',  /* start=6 */
  [req.body.benutzername], (error, result) => {  /* start=6 */
    if(error) { throw error; }                                                                            /* start=6 */
    if(bcrypt.compareSync(req.body.passwort, result.rows[0].passwort)) {                                  /* start=7 */
      req.session.benutzerid = result.rows[0].id;                                             /* start=7 */
      res.redirect('/todos');                                                                             /* start=7 */
    } else {                                                                                              /* start=7 */
      res.redirect('/login_form');                                                                        /* start=7 */
    }                                                                                                     /* start=7 */
  });                                                                                                     /* start=6 */
});                                                                                                       /* start=6 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
