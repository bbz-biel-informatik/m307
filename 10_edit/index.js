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

app.get('/todos/:id/edit', (req, res) => {                                                  /* start=4 */
  pool.query('SELECT * FROM todos WHERE id = $1', [req.params.id], (error, result) => {        /* start=4 */
    if(error) {                                                                             /* start=4 */
      throw error;                                                                          /* start=4 */
    }                                                                                       /* start=4 */
    res.render('edit_todo', { todo: result.rows[0] });                                      /* start=4 */
  });                                                                                       /* start=4 */
});                                                                                         /* start=4 */

app.post('/update/:id', (req, res) => {                                                                         /* start=5 */
  pool.query('UPDATE todos SET name = $1 WHERE id = $2',                                      /* start=6 */
    [req.body.name, req.params.id],                                                         /* start=6 */
    (error, result) => {                                                                    /* start=6 */
      if(error) { throw error; }                                                                                  /* start=6 */
      res.redirect('/todos');                                                                                     /* start=6 */
  });                                                                                                           /* start=6 */
});                                                                                                             /* start=5 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
