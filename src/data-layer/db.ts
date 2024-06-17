import Database from "better-sqlite3";

import path from "path";


const dbPath =
  process.env.NODE_ENV === "development"
    ? "../database/gmc_shelters.sqlite"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    : path.join(process.resourcesPath, "./database/gmc_shelters.sqlite")
console.log("DB PATH", dbPath);
const db = new Database(dbPath)
db.pragma("journal_mode = WAL")

export default db
