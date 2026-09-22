const RESOURCE_QUERY =
  "SELECT resources.id, resources.title, resources.description, resources.category, " +
  "users.display_name AS owner_name " +
  "FROM resources JOIN users ON users.id = resources.owner_id " +
  "WHERE resources.id = ?";

/** GET /resources */
export function listResources(req, res) {
  const db = req.app.locals.db;
  const resources = db.prepare("SELECT id, title, description, category FROM resources ORDER BY id").all();

  res.render("resources/index", { resources });
}

/** GET /resources/:id */
export function showResource(req, res) {
  const db = req.app.locals.db;
  const resource = db.prepare(RESOURCE_QUERY).get(req.params.id);

  if (!resource) return res.status(404).render("errors/404");

  res.render("resources/show", { resource });
}
