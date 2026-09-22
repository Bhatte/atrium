/** Nothing matched. */
export function notFound(req, res) {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "There is no such endpoint." });
  }
  res.status(404).render("errors/404");
}

/** Something threw. */
export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  res.status(500).type("text/plain").send(err.message + "\n\n" + err.stack);
}
