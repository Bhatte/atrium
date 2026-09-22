const PROFILE_QUERY =
  "SELECT id, username, display_name, email, department, role, bio FROM users WHERE id = ?";

const ACCOUNTS_QUERY =
  "SELECT id, username, display_name, department, role FROM users ORDER BY id";

/** GET /api/profile/:id */
export function profileJson(req, res) {
  const db = req.app.locals.db;
  const person = db.prepare(PROFILE_QUERY).get(req.params.id);

  if (!person) {
    return res.status(404).json({ error: "There is no colleague with that id." });
  }

  res.json({
    id: person.id,
    username: person.username,
    displayName: person.display_name,
    email: person.email,
    department: person.department,
    role: person.role,
    bio: person.bio
  });
}

/** GET /api/admin/users */
export function staffAccountsJson(req, res) {
  const db = req.app.locals.db;
  const people = db.prepare(ACCOUNTS_QUERY).all();

  res.json(people.map((person) => ({
    id: person.id,
    displayName: person.display_name,
    username: person.username,
    department: person.department,
    role: person.role
  })));
}
