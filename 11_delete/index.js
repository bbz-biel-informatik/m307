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

app.post('/todos/:id/delete', (req, res) => {                                                 /* start=2 */
  pool.query(`DELETE FROM todos WHERE id = ${req.params.id}`, (error, result) => {            /* start=3 */
    if(error) {                                                                               /* start=3 */
      throw error;                                                                            /* start=3 */
    }                                                                                         /* start=3 */
    res.redirect('/todos');                                                                   /* start=3 */
  });                                                                                         /* start=3 */
});                                                                                           /* start=2 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
