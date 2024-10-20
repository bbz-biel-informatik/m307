import { createApp, upload } from "./config.js";

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

app.get("/new_post", async function (req, res) {    /* start=3 */
  res.render("new_post", {});                       /* start=3 */
});                                                 /* start=3 */

app.post("/create_post", upload.single('image'), async function (req, res) {                                                              /* start=4 */
  const result = await app.locals.pool.query("INSERT INTO todos (text, dateiname) VALUES ($1, $2)", [req.body.text, req.file.filename]);  /* start=5 */
  console.log(result);                                                                                                                    /* start=5 */
  res.redirect("/");                                                                                                                      /* start=5 */
});                                                                                                                                       /* start=4 */

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});