// Importieren von Code-Bibliotheken
var express = require('express');
var mustacheExpress = require('mustache-express');
var Pool = require('pg').Pool;
const multer  = require('multer');                    /* start=4 */
const upload = multer({ dest: 'public/uploads/' });   /* start=4 */

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

app.get('/fileupload', function(req, res) {           /* start=5 */
  res.render('fileupload');                           /* start=5 */
});                                                   /* start=5 */

app.post('/upload', upload.single('image'), function (req, res, next) {         /* start=6 */
  pool.query(`INSERT INTO todos (beschreibung, dateiname) VALUES ('${req.body.beschreibung}', '${req.file.filename}')`, (error, result) => {  /* start=7 */
    if(error) { throw error; }                                                  /* start=7 */
    res.redirect('/todos');                                                     /* start=7 */
  });                                                                           /* start=7 */
});                                                                             /* start=6 */

// Serverstart
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
