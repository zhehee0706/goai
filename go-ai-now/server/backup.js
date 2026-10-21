// Run: npm run backup — copies the live database into backups/, safe while the app is running.
// Keep the newest 30 copies; older ones are removed.
import { DatabaseSync } from "node:sqlite";
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const src = process.env.DB || resolve(import.meta.dirname, "..", "data", "goai.db");
const dir = process.env.BACKUP_DIR || resolve(import.meta.dirname, "..", "backups");
if (!existsSync(src)) { console.error(`No database at ${src}`); process.exit(1); }
mkdirSync(dir, { recursive: true });
const out = resolve(dir, `goai-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}.db`);
new DatabaseSync(src, { readOnly: true }).exec(`VACUUM INTO '${out.replace(/'/g, "''")}'`);
const old = readdirSync(dir).filter((f) => /^goai-.*\.db$/.test(f)).sort().slice(0, -30);
for (const f of old) rmSync(resolve(dir, f));
console.log(`Backup written: ${out}`);
