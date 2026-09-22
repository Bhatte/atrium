-- Atrium schema.
-- Two tables. Small enough that a beginner can read the whole thing.

DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id            INTEGER PRIMARY KEY,
  username      TEXT    NOT NULL UNIQUE,
  display_name  TEXT    NOT NULL,
  email         TEXT    NOT NULL,
  department    TEXT    NOT NULL,
  role          TEXT    NOT NULL CHECK (role IN ('member', 'admin')),
  bio           TEXT    NOT NULL DEFAULT '',
  password_hash TEXT    NOT NULL
);

CREATE TABLE resources (
  id          INTEGER PRIMARY KEY,
  title       TEXT    NOT NULL,
  description TEXT    NOT NULL,
  category    TEXT    NOT NULL,
  owner_id    INTEGER NOT NULL REFERENCES users(id)
);

CREATE INDEX idx_resources_owner ON resources(owner_id);
