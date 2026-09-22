/** GET / */
export function home(req, res) {
  if (req.session && req.session.user) return res.redirect("/dashboard");
  res.redirect("/login");
}

/** GET /dashboard */
export function showDashboard(req, res) {
  res.render("dashboard");
}
