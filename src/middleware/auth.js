const USER_COLUMNS = "id, username, display_name, email, department, role, bio";

function isApiRequest(req) {
  return req.path.startsWith("/api/");
}

function turnAway(req, res) {
  if (isApiRequest(req)) {
    return res.status(401).json({ error: "You need to sign in to use this part of Atrium." });
  }
  return res.redirect("/login");
}

/**
 * Let only signed-in colleagues through. The signed-in colleague is read from
 * the database on every request and handed to the views as `currentUser`.
 */
export function requireAuth(req, res, next) {
  const session = req.session && req.session.user;
  if (!session) return turnAway(req, res);

  const db = req.app.locals.db;
  const person = db.prepare(`SELECT ${USER_COLUMNS} FROM users WHERE id = ?`).get(session.id);

  if (!person) {
    delete req.session.user;
    return turnAway(req, res);
  }

  req.currentUser = person;
  res.locals.currentUser = person;
  next();
}

/** As requireAuth, and the colleague also has to be an administrator. */
export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.currentUser.role === "admin") return next();

    if (isApiRequest(req)) {
      return res.status(403).json({ error: "Administrators only." });
    }
    return res.status(403).send("Administrators only.");
  });
}
