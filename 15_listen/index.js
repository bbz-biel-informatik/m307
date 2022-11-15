// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');
var Pool = require('pg').Pool;

var app = express();
var port = 3000;

// Konfiguration und Einstellungen
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

var pool = new Pool({
  host: 'example.com',
  database: 'MEINEDATENBANK',
  port: 5432,
  user: 'MEINBENUTZERNAME',
  password: 'MEINPASSWORT',
});

// Routen
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/todos', (req, res) => {                                           /* start=2 */
  pool.query('SELECT * FROM todos', (error, result) => {                    /* start=2 */
    if(error) { throw error; }                                              /* start=3 */
    res.render('todos', { todos: result.rows });                            /* start=3 */
  });                                                                       /* start=2 */
});                                                                         /* start=2 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
