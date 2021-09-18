// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');
var Pool = require('pg').Pool;                      /* start=4 */

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

app.get('/todos', (req, res) => {
  pool.query('SELECT * FROM todos', (error, result) => {
    if(error) { throw error; }
    res.render('todos', { todos: result.rows });
  });
});

app.get('/todos/:id', (req, res) => {                                                     /* start=3 */
  pool.query(`SELECT * FROM todos WHERE id = ${req.params.id}`, (error, result) => {      /* start=4 */
    if(error) {                                                                           /* start=4 */
      throw error;                                                                        /* start=4 */
    }                                                                                     /* start=4 */
    res.render('todo', { todo: result.rows[0] });                                         /* start=4 */
  });                                                                                     /* start=4 */
});                                                                                       /* start=3 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
