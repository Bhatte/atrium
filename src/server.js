import { createApp } from "./app.js";
import { DEFAULT_DB_PATH, openDatabase } from "./db/connection.js";
import { resetDatabase } from "./db/reset.js";

const PORT = Number(process.env.PORT) || 9090;
const dbPath = DEFAULT_DB_PATH;

/** Load the lab data the first time the app is started. */
function prepareDatabase() {
  const db = openDatabase(dbPath);
  const users = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'users'").get();
  db.close();

  if (!users) {
    console.log("First run: loading the Atrium lab data.");
    resetDatabase(dbPath);
  }
}

prepareDatabase();

const app = createApp({ dbPath });

// Listen on this machine only. Atrium is deliberately weak, and on a shared
// network such as campus Wi-Fi any other laptop could otherwise reach it.
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Atrium is running at http://localhost:${PORT}`);
});
