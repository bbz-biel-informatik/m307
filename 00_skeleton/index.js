// Importieren von Code-Bibliotheken            /* start=2 */
var express = require('express');               /* start=2 */

var app = express();                            /* start=3 */
var port = 3000;                                /* start=3 */

// Konfiguration und Einstellungen              /* start=4 */

// Routen                                       /* start=5 */
app.get('/', (req, res) => {                    /* start=5 */
  res.send('Hello World!');                     /* start=5 */
});                                             /* start=5 */


// Serverstart                                  /* start=6 */
app.listen(port, () => {                        /* start=6 */
  console.log('App listening on port ' + port); /* start=6 */
});                                             /* start=6 */
