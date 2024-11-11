import { createApp } from "./config.js";      /* start=1, end=3 */
import { createApp, upload } from "./config.js";      /* start=3 */

const app = createApp({
  user: "autumn_star_7622",
  host: "168.119.168.41",
  database: "demo",
  password: "uaioysdfjoysfdf",
  port: 18324,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start", {});
});

app.get("/new_post", async function (req, res) {
  res.render("new_post", {});
});

app.post("/create_post", async function (req, res) {                                                                                      /* start=1, end=5 */
  await app.locals.pool.query("INSERT INTO todos (text) VALUES ($1)", [req.body.text]);                                                   /* start=1, end=6 */
app.post("/create_post", upload.single('image'), async function (req, res) {                                                              /* start=5 */
  await app.locals.pool.query("INSERT INTO todos (text, dateiname) VALUES ($1, $2)", [req.body.text, req.file.filename]);                 /* start=6 */
  res.redirect("/");
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
