// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');
var Pool = require('pg').Pool;
const multer  = require('multer');                    /* start=3 */
const upload = multer({ dest: 'public/uploads/' });   /* start=3 */

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

app.get('/fileupload', function(req, res) {           /* start=4 */
  res.render('fileupload');                           /* start=4 */
});                                                   /* start=4 */

app.post('/upload', upload.single('image'), function (req, res) {         /* start=5 */
  pool.query('INSERT INTO todos (text, dateiname) VALUES ($1, $2)',         /* start=6 */
    [req.body.text, req.file.filename],                                   /* start=6 */
    (error, result) => {                                                  /* start=6 */
      if(error) { throw error; }                                                  /* start=6 */
      res.redirect('/todos');                                                     /* start=6 */
  });                                                                           /* start=6 */
});                                                                             /* start=5 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
