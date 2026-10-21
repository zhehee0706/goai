import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export function openDb(file) {
  if (file !== ":memory:") mkdirSync(dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS owners (
      id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, pass TEXT NOT NULL, created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY, owner_id INTEGER NOT NULL REFERENCES owners(id) ON DELETE CASCADE, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS shops (
      id INTEGER PRIMARY KEY, owner_id INTEGER UNIQUE NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
      slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, owner_name TEXT NOT NULL DEFAULT '',
      city TEXT NOT NULL DEFAULT '', items TEXT NOT NULL DEFAULT '[]',
      goal INTEGER NOT NULL DEFAULT 8, reward TEXT NOT NULL DEFAULT '', offer TEXT NOT NULL DEFAULT '',
      quiet_days INTEGER NOT NULL DEFAULT 30, review_url TEXT NOT NULL DEFAULT '', created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY, shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
      token TEXT UNIQUE NOT NULL, code TEXT NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '',
      mkt INTEGER NOT NULL DEFAULT 0, stamps INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL,
      last_visit INTEGER, last_offer INTEGER, UNIQUE (shop_id, code));
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY, shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
      member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
      receipt TEXT NOT NULL, amount INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL, UNIQUE (shop_id, receipt));
    CREATE TABLE IF NOT EXISTS redemptions (
      id INTEGER PRIMARY KEY, shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
      member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE, created INTEGER NOT NULL);
    -- what customers and the owner did: scan, write, share, poster, week, offer
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY, shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
      kind TEXT NOT NULL, plat TEXT, meta TEXT, created INTEGER NOT NULL);
    CREATE INDEX IF NOT EXISTS events_shop ON events (shop_id, created);
    CREATE INDEX IF NOT EXISTS visits_shop ON visits (shop_id, created);
    -- a counter device that typed the shop's staff PIN: it can only find members, stamp and redeem
    -- an owner's stamp correction: +1 or -1 with the reason, kept so the card's history adds up
    CREATE TABLE IF NOT EXISTS adjustments (
      id INTEGER PRIMARY KEY, shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
      member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE, delta INTEGER NOT NULL, reason TEXT NOT NULL, created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS staff_sessions (
      token TEXT PRIMARY KEY, shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE, expires INTEGER NOT NULL);
  `);
  // added after launch, so older database files get the columns too
  const addCol = (table, col, def) => { if (!db.prepare(`SELECT 1 FROM pragma_table_info('${table}') WHERE name = ?`).get(col)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${def}`); };
  addCol("shops", "staff_pin", "TEXT NOT NULL DEFAULT ''");
  // the brand kit: the shop's real social handle, a brand colour, and a small logo image
  addCol("shops", "handle", "TEXT NOT NULL DEFAULT ''");
  addCol("shops", "brand", "TEXT NOT NULL DEFAULT ''");
  addCol("shops", "logo", "BLOB");
  addCol("shops", "logo_type", "TEXT NOT NULL DEFAULT ''");
  addCol("shops", "logo_at", "INTEGER NOT NULL DEFAULT 0");
  // where the shop is and when it is open; hours is JSON: 7 entries, Monday first, each ["HH:MM", "HH:MM"] or null when closed
  addCol("shops", "address", "TEXT NOT NULL DEFAULT ''");
  addCol("shops", "phone", "TEXT NOT NULL DEFAULT ''");
  addCol("shops", "maps", "TEXT NOT NULL DEFAULT ''");
  addCol("shops", "hours", "TEXT NOT NULL DEFAULT ''");
  addCol("shops", "bday", "TEXT NOT NULL DEFAULT ''");
  addCol("shops", "font", "TEXT NOT NULL DEFAULT ''"); // the shop's font: one of FONTS in server.js, or '' for each look's own // the birthday treat; empty means the welcome-back offer
  addCol("members", "birth_month", "INTEGER NOT NULL DEFAULT 0"); // 1-12, or 0 when the member did not say
  return db;
}
