// Run: npm run admin -- <command>
//   shops                   list every shop with its owner's email and member count
//   reset-password <email>  give that owner a new random password and sign them out everywhere
import { randomBytes } from "node:crypto";
import { resolve } from "node:path";
import { openDb } from "./db.js";
import { hashPw } from "./server.js";

const db = openDb(process.env.DB || resolve(import.meta.dirname, "..", "data", "goai.db"));
const [cmd, arg] = process.argv.slice(2);

if (cmd === "shops") {
  console.table(db.prepare(`SELECT s.slug, s.name, s.type, o.email, (SELECT COUNT(*) FROM members m WHERE m.shop_id = s.id) AS members,
    date(s.created / 1000, 'unixepoch') AS created FROM shops s JOIN owners o ON o.id = s.owner_id ORDER BY s.created`).all());
} else if (cmd === "reset-password" && arg) {
  const o = db.prepare("SELECT id FROM owners WHERE email = ?").get(arg.toLowerCase());
  if (!o) { console.error(`No owner with email ${arg}`); process.exit(1); }
  const pw = randomBytes(9).toString("base64url");
  db.prepare("UPDATE owners SET pass = ? WHERE id = ?").run(hashPw(pw), o.id);
  db.prepare("DELETE FROM sessions WHERE owner_id = ?").run(o.id);
  console.log(`New password for ${arg}: ${pw}\nGive it to the owner privately; they can change it in Settings.`);
} else {
  console.log("Usage: npm run admin -- shops | reset-password <email>");
  process.exit(cmd ? 1 : 0);
}
