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

app.get('/todos/:id', (req, res) => {                                       /* start=2 */
  pool.query('SELECT * FROM todos WHERE id = $1',                           /* start=3 */
    [req.params.id],                                                        /* start=3 */
    (error, result) => {                                                    /* start=3 */
      if(error) { throw error; }                                            /* start=3 */
      res.render('todo', { todos: result.rows[0] });                        /* start=4 */
  });                                                                       /* start=3 */
});                                                                         /* start=3 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
