// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');


var app = express();
var port = 3000;

// Konfiguration und Einstellungen
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));                /* start=2 */

// Routen
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/new', (req, res) => {                                 /* start=3 */
  res.render('new_todo');                                       /* start=3 */
});                                                             /* start=3 */

app.post('/create', (req, res) => {                                                           /* start=5 */
  pool.query('INSERT INTO todos (name) VALUES (?)',                                           /* start=6 */
    [req.body.name],                                                                          /* start=6 */
    (error, result) => {                                                                      /* start=6 */
    if(error) { throw error; }                                                                /* start=6 */
    res.redirect('/');                                                                        /* start=7 */
  });                                                                                         /* start=6 */
});                                                                                           /* start=5 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
