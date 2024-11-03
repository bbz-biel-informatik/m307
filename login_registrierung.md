# Login und Registrierung

Ein Loginsystem funktioniert so, dass bei der Registrierung ein neuer Eintrag in der DB-Tabelle mit den Benutzer/innen erstellt wird. Dort
wird auch das Passwort (verschlüsselt) gespeichert. Beim Login wird dann das eingegebene Passwort mit dem in der DB gespeicherten Passwort
verglichen.

Falls der Login-Versuch erfolgreich war, wird die ID der angemeldeten Benutzer/in gespeichert und kann bei folgenden Seitenaufrufen auf dem
Server verwendet werden, um zu identifizieren, wer eingeloggt ist.

> [!CAUTION]
> Der Code geht davon aus, dass die Datenbanktabelle `users` heisst, und die Spalten `id`, `username` und `password` enthalten. Falls eure
> Datenbank anders benannt ist, müsst ihr im untenstehenden Code jeweils die Bezeichnungen ändern, damit der Code funktioniert!

## Anpassungen

### config.js

Ganz oben, nach der Zeile `import sessions from "express-session";` die folgende Zeile einfügen:

```js
import bcrypt from "bcrypt";
```

Weiter unten, nach der Zeile `app.locals.pool = pool;`, den folgenden Code einfügen. Damit wird definiert, wie die Registrierung und das Login funktionieren sollen.

```js
  app.get("/register", function (req, res) {
    res.render("register");
  });

  app.post("/register", function (req, res) {
    var password = bcrypt.hashSync(req.body.password, 10);
    pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [req.body.username, password],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/login");
      }
    );
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.post("/login", function (req, res) {
    pool.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        if (bcrypt.compareSync(req.body.password, result.rows[0].password)) {
          req.session.userid = result.rows[0].id;
          res.redirect("/");
        } else {
          res.redirect("/login");
        }
      }
    );
  });
```

### views/login.handlebars

```handlebars
<h2>Login</h2>

<form action="/login" method="POST">
  E-Mail: <input name="username" type="text" /><br />
  Passwort: <input name="password" type="password" /><br />
  <input type="submit" value="Anmelden" />
</form>
<a href="/register" class="button">Registrieren</a>
```

### views/register.handlebars

```handlebars
<h2>Registrieren</h2>

<form action="/register" method="POST">
  E-Mail: <input name="username" type="text" /><br />
  Passwort: <input name="password" type="password" /><br />
  <input type="submit" value="Registrieren" />
</form>
```

### index.js

Jede Seite, die nun durch das Login geschützt werden soll, muss überprüfen, ob eine Person angemeldet ist. Das kann
mit dem folgenden Code getan werden:

```js
if (!req.session.userid) {
  res.redirect("/login");
  return;
}
```

Falls die Person nicht angemeldet ist, wird sie automatisch auf die Loginseite weitergeleitet.

Um eine bestimmte Seite zu schützen, kann der obestehende Code in der index.js-Date eingefügt werden:

```diff
app.get("/", async function (req, res) {
+  if (!req.session.userid) {
+    res.redirect("/login");
+    return;
+  }
  const posts = await app.locals.pool.query("SELECT * FROM posts");
  res.render("start", { posts: posts.rows });
});
```

In der Variable `req.session.userid` ist die ID der eingeloggten Person gespeichert. Damit können nun auch
benutzerspezifische Datenbankabfragen gemacht werden, mit welchen nur die Posts der eingeloggten Person
geladen werden:

```js
const posts = await app.locals.pool.query(
  "SELECT * FROM posts WHERE user_id = $1", [req.session.userid]
);
```

Ausserdem kann beim Eintragen von Daten in die Datenbank die ID der angemeldeten Person gespeichert werden:

```js
await app.locals.pool.query(
  "INSERT INTO posts (user_id, titel, inhalt) VALUES ($1, $2, $3)",
  [req.sesssion.userid, req.body.titel, req.body.inhalt]
);
```
