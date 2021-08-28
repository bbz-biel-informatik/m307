// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');
var Pool = require('pg').Pool:                      /* start=4 */

var app = express();
var port = 3000;

// Konfiguration und Einstellungen
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

var pool = new Pool({                               /* start=5 */
  user: 'MEINBENUTZERNAME',                         /* start=5 */
  host: 'localhost',                                /* start=5 */
  database: 'MEINEDATENBANK',                       /* start=5 */
  password: 'MEINPASSWORT',                         /* start=5 */
  port: 5432,                                       /* start=5 */
});                                                 /* start=5 */

// Routen
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/todos', (req, res) => {                                           /* start=6 */
  pool.query('SELECT * FROM todos', (error, result) => {                    /* start=6 */
    if(error) { throw error; }                                              /* start=7 */
    res.render('todos', { todos: result.rows });                            /* start=7 */
  });                                                                       /* start=6 */
});                                                                         /* start=6 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
