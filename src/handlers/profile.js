const UPDATE_PROFILE = "UPDATE users SET email = ?, department = ?, bio = ? WHERE id = ?";

/** GET /profile */
export function showProfile(req, res) {
  res.render("profile/index", { saved: req.query.saved === "1" });
}

/** POST /profile */
export function saveProfile(req, res) {
  const db = req.app.locals.db;
  const body = req.body || {};

  db.prepare(UPDATE_PROFILE).run(body.email, body.department, body.bio, body.userId);

  res.redirect("/profile?saved=1");
}
