import { verifyPassword } from "../auth/passwords.js";

/** GET /login */
export function showLogin(req, res) {
  res.render("auth/login");
}

/** POST /login */
export function signIn(req, res) {
  const db = req.app.locals.db;
  const body = req.body || {};
  const username = body.username || "";
  const password = body.password || "";

  const person = db.prepare("SELECT id, password_hash FROM users WHERE username = ?").get(username);

  if (!person || !verifyPassword(password, person.password_hash)) {
    return res.status(200).render("auth/login", { error: "That username and password are incorrect." });
  }

  req.session.user = { id: person.id };
  res.redirect("/dashboard");
}

/** POST /logout */
export function signOut(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}
