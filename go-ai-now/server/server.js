import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, normalize, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, randomInt, scryptSync, timingSafeEqual } from "node:crypto";
import { openDb } from "./db.js";

process.env.TZ ||= "Asia/Kuala_Lumpur"; // month boundaries follow the shop's clock
const ROOT = resolve(import.meta.dirname, "..", "app");
const DAY = 864e5;
const TYPES = ["cafe", "restaurant", "bakery", "drinks", "salon", "beauty", "pet", "florist", "fashion", "other"]; // keep in step with TYPES in app/app.js
const PLATS = ["xhs", "ig", "fb", "tiktok", "threads", "lemon8", "google", "wa"];
const MIME = { ".webmanifest": "application/manifest+json", ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".ico": "image/x-icon", ".json": "application/json" };

class Bad extends Error { constructor(code, msg) { super(msg); this.code = code; } }
const fail = (code, msg) => { throw new Bad(code, msg); };
const send = (res, code, body, headers = {}) => { res.writeHead(code, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...SAFE, ...headers }); res.end(typeof body === "string" || body instanceof Uint8Array ? body : JSON.stringify(body)); };
// every response
const SAFE = { "x-content-type-options": "nosniff", "referrer-policy": "same-origin", "permissions-policy": "camera=(self), microphone=(), geolocation=()", ...(process.env.SECURE ? { "strict-transport-security": "max-age=31536000" } : {}) };
// the app page: scripts only from here and the two CDNs it uses; never framed
const CSP = "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";
// spreadsheet-safe CSV: every cell quoted, and a leading = + - @ cannot run as a formula
const csvCell = (v) => { const x = String(v ?? ""); return `"${(/^[=+\-@\t\r]/.test(x) ? "'" + x : x).replace(/"/g, '""')}"`; };
const csv = (rows) => "\uFEFF" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
const csvHead = (name) => ({ "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="${name}"` });
const when = (t) => (t ? new Date(t).toLocaleString("sv-SE").slice(0, 16) : "");

// ---- input checks at the trust boundary ----
const str = (v, max, min = 0) => { const s = typeof v === "string" ? v.trim() : ""; if (s.length < min || s.length > max) fail(400, "invalid"); return s; };
const int = (v, lo, hi) => { const n = Number(v); if (!Number.isInteger(n) || n < lo || n > hi) fail(400, "invalid"); return n; };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FONTS = ["bold", "poster", "elegant", "friendly", "hand", "modern"];
const HANDLE = /^[A-Za-z0-9._]{1,30}$/, HEX = /^#[0-9a-fA-F]{6}$/, TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
// a logo is a real PNG, JPEG or WebP, checked by its first bytes rather than trusted from the request
const IMAGE_SIG = { "image/png": (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47, "image/jpeg": (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff, "image/webp": (b) => b.toString("latin1", 0, 4) === "RIFF" && b.toString("latin1", 8, 12) === "WEBP" };

async function readBody(req, max = 64e3) {
  // JSON only: a cross-site form cannot send this content type without a preflight
  if (!/^application\/json\b/.test(req.headers["content-type"] || "")) fail(415, "json_only");
  const chunks = []; let size = 0;
  for await (const c of req) { size += c.length; if (size > max) fail(413, "too_big"); chunks.push(c); }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { fail(400, "invalid"); }
}

// ponytail: in-memory rate limits, per process; move them to the database if this ever runs on more than one instance
const hits = new Map();
function limit(key, max, ms) {
  const now = Date.now(), h = (hits.get(key) || []).filter((t) => now - t < ms);
  if (h.length >= max) fail(429, "too_many");
  h.push(now); hits.set(key, h);
}

export const hashPw = (pw) => { const salt = randomBytes(16); return `${salt.toString("hex")}:${scryptSync(pw, salt, 64).toString("hex")}`; };
const checkPw = (pw, stored) => { const [s, h] = stored.split(":"), a = scryptSync(pw, Buffer.from(s, "hex"), 64), b = Buffer.from(h, "hex"); return a.length === b.length && timingSafeEqual(a, b); };
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O or 1/I, so staff can type it
const newCode = () => Array.from({ length: 6 }, () => CODE_CHARS[randomInt(CODE_CHARS.length)]).join("");
const cookieOf = (req, name) => (req.headers.cookie || "").split(/;\s*/).map((c) => c.split("=")).find(([k]) => k === name)?.[1];

// how many calendar months the shop has been here, this one included; the report list stops at 36
function monthsSince(created) {
  const c = new Date(created), now = new Date();
  return Math.max(1, Math.min(36, (now.getFullYear() - c.getFullYear()) * 12 + now.getMonth() - c.getMonth() + 1));
}
function monthRange(offset) {
  const now = new Date(), a = new Date(now.getFullYear(), now.getMonth() + offset, 1), b = new Date(now.getFullYear(), now.getMonth() + offset + 1, 1);
  return [a.getTime(), b.getTime(), new Date(b - 1).getDate()];
}

export function makeServer(db) {
  const q = (sql) => db.prepare(sql);
  q("DELETE FROM sessions WHERE expires < ?").run(Date.now());
  q("DELETE FROM staff_sessions WHERE expires < ?").run(Date.now());

  const pubShop = (s) => ({ slug: s.slug, name: s.name, type: s.type, ownerName: s.owner_name, city: s.city, items: JSON.parse(s.items), goal: s.goal, reward: s.reward, offer: s.offer, quietDays: s.quiet_days, reviewUrl: s.review_url, hasPin: !!s.staff_pin, handle: s.handle, brand: s.brand, logoAt: s.logo_at || 0,
    address: s.address || "", phone: s.phone || "", maps: s.maps || "", hours: s.hours ? JSON.parse(s.hours) : [], bday: s.bday || "", font: s.font || "" });
  const pubMember = (m, shop) => ({ name: m.name, code: m.code, stamps: m.stamps, goal: shop.goal, reward: shop.reward, phone: m.phone, mkt: !!m.mkt, created: m.created, lastVisit: m.last_visit, lastOffer: m.last_offer, birthMonth: m.birth_month || 0 });

  function shopFields(b) {
    if (!Array.isArray(b.items)) fail(400, "invalid");
    const items = b.items.slice(0, 12).map((x) => ({ en: str(x?.en, 40, 1), zh: str(x?.zh ?? "", 40), ...(x?.price ? { price: str(x.price, 14) } : {}) })); // a price is optional
    if (!items.length) fail(400, "need_item");
    const reviewUrl = str(b.reviewUrl ?? "", 300);
    if (reviewUrl && !/^https:\/\//.test(reviewUrl)) fail(400, "invalid");
    if (!TYPES.includes(b.type)) fail(400, "invalid");
    return { name: str(b.name, 40, 1), type: b.type, owner_name: str(b.ownerName ?? "", 40), city: str(b.city ?? "", 40), items: JSON.stringify(items),
      goal: int(b.goal, 3, 20), reward: str(b.reward ?? "", 80), offer: str(b.offer ?? "", 80), quiet_days: int(b.quietDays, 7, 180), review_url: reviewUrl };
  }
  function slugFor(name) {
    const base = name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s-]+/g, "-").slice(0, 30) || "shop";
    let slug = base, i = 1;
    while (q("SELECT 1 FROM shops WHERE slug = ?").get(slug)) slug = `${base}-${++i}`;
    return slug;
  }
  function startSession(ownerId) {
    const token = randomBytes(32).toString("base64url");
    q("INSERT INTO sessions (token, owner_id, expires) VALUES (?, ?, ?)").run(token, ownerId, Date.now() + 30 * DAY);
    return `sid=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${30 * 86400}${process.env.SECURE ? "; Secure" : ""}`;
  }
  function ownerId(req) {
    const t = cookieOf(req, "sid");
    return t ? q("SELECT owner_id FROM sessions WHERE token = ? AND expires > ?").get(t, Date.now())?.owner_id ?? null : null;
  }
  function myShop(req) {
    const id = ownerId(req);
    if (!id) fail(401, "need_login");
    return q("SELECT * FROM shops WHERE owner_id = ?").get(id) || fail(404, "not_found");
  }
  // a device that typed this shop's staff PIN, or the shop's own owner
  function canStaff(req, shop) {
    const t = cookieOf(req, "staff");
    return ownerId(req) === shop.owner_id || !!(t && q("SELECT 1 FROM staff_sessions WHERE token = ? AND shop_id = ? AND expires > ?").get(t, shop.id, Date.now()));
  }
  // staff routes: /api/stamp is the owner's own shop, /api/staff/<slug>/stamp is that shop for the owner or a PIN device
  function staffShop(req, slug) {
    if (!slug) return myShop(req);
    const shop = shopBySlug(slug);
    return canStaff(req, shop) ? shop : fail(401, "need_pin");
  }
  const shopBySlug = (slug) => q("SELECT * FROM shops WHERE slug = ?").get(slug) || fail(404, "not_found");
  const cardOf = (shop, token) => q("SELECT * FROM members WHERE shop_id = ? AND token = ?").get(shop.id, token) || fail(404, "not_found");
  const memberByCode = (shop, code) => q("SELECT * FROM members WHERE shop_id = ? AND code = ?").get(shop.id, str(code, 8, 4).toUpperCase()) || fail(404, "not_found");

  function monthReport(shop, offset) {
    const [a, b, days] = monthRange(offset);
    const evs = q("SELECT kind, plat, meta, created FROM events WHERE shop_id = ? AND created >= ? AND created < ?").all(shop.id, a, b);
    const vis = q("SELECT amount, created FROM visits WHERE shop_id = ? AND created >= ? AND created < ?").all(shop.id, a, b);
    const day = (t) => new Date(t).getDate() - 1;
    const r = { start: a, days, scans: 0, writes: 0, shares: 0, posters: 0, offers: 0, returns: vis.length, spend: 0, byPlat: {}, loved: {}, styles: {},
      daily: { writes: Array(days).fill(0), returns: Array(days).fill(0) },
      joins: q("SELECT COUNT(*) n FROM members WHERE shop_id = ? AND created >= ? AND created < ?").get(shop.id, a, b).n,
      redeemed: q("SELECT COUNT(*) n FROM redemptions WHERE shop_id = ? AND created >= ? AND created < ?").get(shop.id, a, b).n };
    for (const e of evs) {
      if (e.kind === "scan") r.scans++;
      else if (e.kind === "share") { r.shares++; r.byPlat[e.plat] = (r.byPlat[e.plat] || 0) + 1; }
      else if (e.kind === "poster") r.posters++;
      else if (e.kind === "week") r.posters += 7;
      else if (e.kind === "offer") r.offers++;
      else if (e.kind === "write") {
        r.writes++; r.daily.writes[day(e.created)]++;
        const m = JSON.parse(e.meta || "{}");
        for (const v of m.vibes || []) r.loved[v] = (r.loved[v] || 0) + 1;
        if (m.style) r.styles[m.style] = (r.styles[m.style] || 0) + 1;
      }
    }
    for (const v of vis) { r.spend += v.amount; r.daily.returns[day(v.created)]++; }
    r.spend /= 100;
    return r;
  }

  const ROUTES = [
    // ---- owner account ----
    ["POST", "/api/signup", async ({ req, ip }) => {
      limit(`signup:${ip}`, 5, 3600e3);
      const b = await readBody(req), email = str(b.email, 120, 3).toLowerCase(), pw = str(b.password, 200, 8), f = shopFields(b);
      if (!EMAIL.test(email)) fail(400, "invalid");
      if (q("SELECT 1 FROM owners WHERE email = ?").get(email)) fail(409, "email_taken");
      db.exec("BEGIN");
      try {
        const o = q("INSERT INTO owners (email, pass, created) VALUES (?, ?, ?)").run(email, hashPw(pw), Date.now());
        q(`INSERT INTO shops (owner_id, slug, name, type, owner_name, city, items, goal, reward, offer, quiet_days, review_url, created)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(o.lastInsertRowid, slugFor(f.name), f.name, f.type, f.owner_name, f.city, f.items, f.goal, f.reward, f.offer, f.quiet_days, f.review_url, Date.now());
        db.exec("COMMIT");
        const shop = q("SELECT * FROM shops WHERE owner_id = ?").get(o.lastInsertRowid);
        return [201, { shop: pubShop(shop) }, { "set-cookie": startSession(o.lastInsertRowid) }];
      } catch (e) { db.exec("ROLLBACK"); throw e; }
    }],
    ["POST", "/api/login", async ({ req, ip }) => {
      limit(`login:${ip}`, 10, 900e3);
      const b = await readBody(req), o = q("SELECT * FROM owners WHERE email = ?").get(str(b.email, 120).toLowerCase());
      if (!o || !checkPw(String(b.password ?? ""), o.pass)) fail(401, "bad_login");
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE owner_id = ?").get(o.id)) }, { "set-cookie": startSession(o.id) }];
    }],
    ["POST", "/api/logout", async ({ req }) => {
      const t = cookieOf(req, "sid");
      if (t) q("DELETE FROM sessions WHERE token = ?").run(t);
      return [200, { ok: true }, { "set-cookie": "sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0" }];
    }],
    ["PUT", "/api/password", async ({ req, ip }) => {
      limit(`pw:${ip}`, 10, 900e3);
      const id = ownerId(req) || fail(401, "need_login"), b = await readBody(req), o = q("SELECT * FROM owners WHERE id = ?").get(id);
      if (!checkPw(String(b.old ?? ""), o.pass)) fail(401, "bad_password");
      q("UPDATE owners SET pass = ? WHERE id = ?").run(hashPw(str(b.password, 200, 8)), id);
      q("DELETE FROM sessions WHERE owner_id = ? AND token != ?").run(id, cookieOf(req, "sid") || ""); // other phones sign in again
      return [200, { ok: true }];
    }],
    ["POST", "/api/account/delete", async ({ req, ip }) => {
      limit(`pw:${ip}`, 10, 900e3);
      const id = ownerId(req) || fail(401, "need_login"), o = q("SELECT * FROM owners WHERE id = ?").get(id);
      if (!checkPw(String((await readBody(req)).password ?? ""), o.pass)) fail(401, "bad_password");
      q("DELETE FROM owners WHERE id = ?").run(id); // the shop, its members, visits and events go with it
      return [200, { ok: true }, { "set-cookie": "sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0" }];
    }],
    ["GET", "/api/health", async () => [200, { ok: true }]],
    ["GET", "/api/me", async ({ req }) => {
      const id = ownerId(req), shop = id && q("SELECT * FROM shops WHERE owner_id = ?").get(id);
      return [200, { shop: shop ? pubShop(shop) : null }];
    }],
    ["PUT", "/api/shop", async ({ req }) => {
      const shop = myShop(req), f = shopFields(await readBody(req));
      q(`UPDATE shops SET name = ?, type = ?, owner_name = ?, city = ?, items = ?, goal = ?, reward = ?, offer = ?, quiet_days = ?, review_url = ? WHERE id = ?`)
        .run(f.name, f.type, f.owner_name, f.city, f.items, f.goal, f.reward, f.offer, f.quiet_days, f.review_url, shop.id);
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE id = ?").get(shop.id)) }];
    }],
    // the brand kit: handle and colour as text, the logo as a small image of its own
    ["PUT", "/api/shop/brand", async ({ req }) => {
      const shop = myShop(req), b = await readBody(req), handle = str(b.handle ?? "", 31).replace(/^@/, ""), brand = str(b.brand ?? "", 7);
      if ((handle && !HANDLE.test(handle)) || (brand && !HEX.test(brand))) fail(400, "invalid");
      q("UPDATE shops SET handle = ?, brand = ? WHERE id = ?").run(handle, brand.toUpperCase(), shop.id);
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE id = ?").get(shop.id)) }];
    }],
    // the shop's font, for its name and its posters
    ["PUT", "/api/shop/font", async ({ req }) => {
      const shop = myShop(req), font = String((await readBody(req)).font ?? "");
      if (font && !FONTS.includes(font)) fail(400, "invalid");
      q("UPDATE shops SET font = ? WHERE id = ?").run(font, shop.id);
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE id = ?").get(shop.id)) }];
    }],
    // what members get: the full-card reward, the comeback offer and when it goes out, and the birthday treat
    ["PUT", "/api/shop/rewards", async ({ req }) => {
      const shop = myShop(req), b = await readBody(req);
      q("UPDATE shops SET goal = ?, reward = ?, offer = ?, quiet_days = ?, bday = ? WHERE id = ?").run(int(b.goal, 3, 20), str(b.reward ?? "", 80), str(b.offer ?? "", 80), int(b.quietDays, 7, 180), str(b.bday ?? "", 80), shop.id);
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE id = ?").get(shop.id)) }];
    }],
    // where to find the shop and when it is open: the customer page, notices and the print kit show these
    ["PUT", "/api/shop/details", async ({ req }) => {
      const shop = myShop(req), b = await readBody(req), address = str(b.address ?? "", 160), phone = str(b.phone ?? "", 20).replace(/[^\d+]/g, ""), maps = str(b.maps ?? "", 300);
      if (phone && !/^\+?\d{7,15}$/.test(phone)) fail(400, "bad_phone");
      if (maps && !/^https:\/\/\S+$/.test(maps)) fail(400, "invalid");
      if (!Array.isArray(b.hours) || b.hours.length !== 7) fail(400, "invalid");
      const hours = b.hours.map((d) => (Array.isArray(d) && d.length === 2 && d.every((x) => TIME.test(String(x))) ? [d[0], d[1]] : null));
      q("UPDATE shops SET address = ?, phone = ?, maps = ?, hours = ? WHERE id = ?").run(address, phone, maps, JSON.stringify(hours), shop.id);
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE id = ?").get(shop.id)) }];
    }],
    ["PUT", "/api/shop/logo", async ({ req }) => {
      const shop = myShop(req), b = await readBody(req, 400e3), type = String(b.type || ""), data = Buffer.from(String(b.data || ""), "base64");
      if (!IMAGE_SIG[type] || data.length < 16 || !IMAGE_SIG[type](data)) fail(400, "bad_image");
      if (data.length > 250e3) fail(413, "too_big");
      q("UPDATE shops SET logo = ?, logo_type = ?, logo_at = ? WHERE id = ?").run(data, type, Date.now(), shop.id);
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE id = ?").get(shop.id)) }];
    }],
    ["DELETE", "/api/shop/logo", async ({ req }) => {
      const shop = myShop(req);
      q("UPDATE shops SET logo = NULL, logo_type = '', logo_at = 0 WHERE id = ?").run(shop.id);
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE id = ?").get(shop.id)) }];
    }],
    ["PUT", "/api/shop/pin", async ({ req }) => {
      const shop = myShop(req), pin = String((await readBody(req)).pin ?? "");
      if (!/^\d{4,6}$/.test(pin)) fail(400, "invalid");
      q("UPDATE shops SET staff_pin = ? WHERE id = ?").run(hashPw(pin), shop.id);
      q("DELETE FROM staff_sessions WHERE shop_id = ?").run(shop.id); // a new PIN signs out every staff device
      return [200, { shop: pubShop(q("SELECT * FROM shops WHERE id = ?").get(shop.id)) }];
    }],

    // ---- staff PIN: a counter device unlocks one shop's stamp screen ----
    ["GET", /^\/api\/staff\/([a-z0-9-]{1,40})$/, async ({ req, params }) => { const shop = shopBySlug(params[0]); return [200, { shop: pubShop(shop), ok: canStaff(req, shop) }]; }],
    ["POST", /^\/api\/staff\/([a-z0-9-]{1,40})\/login$/, async ({ req, ip, params }) => {
      const shop = shopBySlug(params[0]);
      if (!shop.staff_pin) fail(409, "no_pin");
      limit(`pin:${ip}`, 10, 900e3);
      limit(`pin:${shop.id}`, 30, 3600e3); // caps guessing from many addresses; devices already unlocked keep working
      if (!checkPw(String((await readBody(req)).pin ?? ""), shop.staff_pin)) fail(401, "bad_pin");
      const token = randomBytes(32).toString("base64url");
      q("INSERT INTO staff_sessions (token, shop_id, expires) VALUES (?, ?, ?)").run(token, shop.id, Date.now() + 180 * DAY);
      return [200, { ok: true }, { "set-cookie": `staff=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${180 * 86400}${process.env.SECURE ? "; Secure" : ""}` }];
    }],

    // ---- owner data ----
    // the report list: every month since the shop joined (up to 3 years), newest first, with the headline numbers
    ["GET", "/api/report/months", async ({ req }) => {
      const shop = myShop(req);
      return [200, { months: Array.from({ length: monthsSince(shop.created) }, (_, i) => {
        const r = monthReport(shop, -i);
        return { offset: -i, start: r.start, days: r.days, spend: r.spend, returns: r.returns, joins: r.joins, posts: r.writes + r.posters, scans: r.scans, shares: r.shares };
      }) }];
    }],
    // one month, with the month before it for comparison
    ["GET", /^\/api\/report\/month\/(\d{1,2})$/, async ({ req, params }) => {
      const shop = myShop(req), o = -Number(params[0]);
      if (-o >= monthsSince(shop.created)) fail(404, "not_found");
      return [200, { this: monthReport(shop, o), last: monthReport(shop, o - 1) }];
    }],
    // the full report: every month oldest first, and the totals across them
    ["GET", "/api/report/all", async ({ req }) => {
      const shop = myShop(req), months = Array.from({ length: monthsSince(shop.created) }, (_, i) => monthReport(shop, -i)).reverse();
      const total = { start: months[0].start, days: 0, scans: 0, writes: 0, shares: 0, posters: 0, offers: 0, returns: 0, spend: 0, joins: 0, redeemed: 0, byPlat: {}, loved: {}, styles: {} };
      for (const r of months) {
        for (const k of ["days", "scans", "writes", "shares", "posters", "offers", "returns", "spend", "joins", "redeemed"]) total[k] += r[k];
        for (const k of ["byPlat", "loved", "styles"]) for (const [x, v] of Object.entries(r[k])) total[k][x] = (total[k][x] || 0) + v;
      }
      total.spend = Math.round(total.spend * 100) / 100;
      return [200, { months, total }];
    }],
    ["GET", "/api/report", async ({ req }) => {
      const shop = myShop(req), cut = Date.now() - shop.quiet_days * DAY;
      const quiet = "shop_id = ? AND COALESCE(last_visit, created) < ?";
      return [200, {
        this: monthReport(shop, 0), last: monthReport(shop, -1),
        members: q("SELECT COUNT(*) n FROM members WHERE shop_id = ?").get(shop.id).n,
        quiet: q(`SELECT COUNT(*) n FROM members WHERE ${quiet}`).get(shop.id, cut).n,
        quietReach: q(`SELECT COUNT(*) n FROM members WHERE ${quiet} AND mkt = 1 AND phone != '' AND COALESCE(last_offer, 0) < ?`).get(shop.id, cut, cut).n,
        all: {
          photos: q("SELECT COUNT(*) n FROM events WHERE shop_id = ? AND kind IN ('write', 'poster')").get(shop.id).n + 7 * q("SELECT COUNT(*) n FROM events WHERE shop_id = ? AND kind = 'week'").get(shop.id).n,
          returns: q("SELECT COUNT(*) n FROM visits WHERE shop_id = ?").get(shop.id).n,
          scans: q("SELECT COUNT(*) n FROM events WHERE shop_id = ? AND kind = 'scan'").get(shop.id).n,
          posters: q("SELECT COUNT(*) n FROM events WHERE shop_id = ? AND kind IN ('poster', 'week')").get(shop.id).n,
        },
      }];
    }],
    ["GET", "/api/members", async ({ req }) => {
      const shop = myShop(req);
      return [200, { members: q("SELECT * FROM members WHERE shop_id = ? ORDER BY COALESCE(last_visit, created) DESC LIMIT 1000").all(shop.id).map((m) => pubMember(m, shop)) }];
    }],
    // ---- staff: the owner, or a device with the staff PIN (see staffShop) ----
    ["GET", /^\/api\/(?:staff\/([a-z0-9-]{1,40})\/)?member\/([A-Za-z0-9]{4,8})$/, async ({ req, params }) => { const shop = staffShop(req, params[0]); return [200, { member: pubMember(memberByCode(shop, params[1]), shop) }]; }],
    // a member who forgot their card gives their phone number: the last 9 digits match +60 12-345 6789 and 012-345 6789 alike
    ["GET", /^\/api\/(?:staff\/([a-z0-9-]{1,40})\/)?phone\/(\+?\d{8,15})$/, async ({ req, params }) => {
      const shop = staffShop(req, params[0]), rows = q("SELECT * FROM members WHERE shop_id = ? AND phone LIKE ? LIMIT 2").all(shop.id, "%" + params[1].replace(/\D/g, "").slice(-9));
      if (rows.length !== 1) fail(404, "not_found");
      return [200, { member: pubMember(rows[0], shop) }];
    }],
    ["POST", /^\/api\/(?:staff\/([a-z0-9-]{1,40})\/)?stamp$/, async ({ req, params }) => {
      const shop = staffShop(req, params[0]), b = await readBody(req), m = memberByCode(shop, b.code);
      const receipt = str(b.receipt, 20, 1).toUpperCase(), amount = Number(b.amount ?? 0);
      if (!Number.isFinite(amount) || amount < 0 || amount > 100000) fail(400, "invalid");
      try { q("INSERT INTO visits (shop_id, member_id, receipt, amount, created) VALUES (?, ?, ?, ?, ?)").run(shop.id, m.id, receipt, Math.round(amount * 100), Date.now()); }
      catch (e) { if (/UNIQUE/.test(e.message)) fail(409, "dup_receipt"); throw e; }
      q("UPDATE members SET stamps = stamps + 1, last_visit = ? WHERE id = ?").run(Date.now(), m.id);
      return [200, { member: pubMember(q("SELECT * FROM members WHERE id = ?").get(m.id), shop) }];
    }],
    ["POST", /^\/api\/(?:staff\/([a-z0-9-]{1,40})\/)?redeem$/, async ({ req, params }) => {
      const shop = staffShop(req, params[0]), m = memberByCode(shop, (await readBody(req)).code);
      if (m.stamps < shop.goal) fail(409, "no_reward");
      q("UPDATE members SET stamps = stamps - ? WHERE id = ?").run(shop.goal, m.id);
      q("INSERT INTO redemptions (shop_id, member_id, created) VALUES (?, ?, ?)").run(shop.id, m.id, Date.now());
      return [200, { member: pubMember(q("SELECT * FROM members WHERE id = ?").get(m.id), shop) }];
    }],
    // a mistaken stamp can be taken back for 10 minutes
    ["POST", /^\/api\/(?:staff\/([a-z0-9-]{1,40})\/)?unstamp$/, async ({ req, params }) => {
      const shop = staffShop(req, params[0]), m = memberByCode(shop, (await readBody(req)).code);
      const v = q("SELECT id FROM visits WHERE member_id = ? AND created > ? ORDER BY created DESC LIMIT 1").get(m.id, Date.now() - 10 * 60e3) || fail(409, "too_late");
      q("DELETE FROM visits WHERE id = ?").run(v.id);
      q("UPDATE members SET stamps = MAX(0, stamps - 1), last_visit = (SELECT MAX(created) FROM visits WHERE member_id = ?) WHERE id = ?").run(m.id, m.id);
      return [200, { member: pubMember(q("SELECT * FROM members WHERE id = ?").get(m.id), shop) }];
    }],
    // the owner's view of one member: every stamped visit, reward and correction
    ["GET", /^\/api\/member\/([A-Za-z0-9]{4,8})\/history$/, async ({ req, params }) => {
      const shop = myShop(req), m = memberByCode(shop, params[0]);
      return [200, {
        member: pubMember(m, shop),
        visits: q("SELECT receipt, amount, created FROM visits WHERE member_id = ? ORDER BY created DESC LIMIT 50").all(m.id).map((v) => ({ receipt: v.receipt, amount: v.amount / 100, created: v.created })),
        rewards: q("SELECT created FROM redemptions WHERE member_id = ? ORDER BY created DESC LIMIT 50").all(m.id).map((r) => r.created),
        fixes: q("SELECT delta, reason, created FROM adjustments WHERE member_id = ? ORDER BY created DESC LIMIT 50").all(m.id),
      }];
    }],
    // a stamp correction: one at a time, with a reason, and never below zero
    ["POST", /^\/api\/member\/([A-Za-z0-9]{4,8})\/adjust$/, async ({ req, params }) => {
      const shop = myShop(req), m = memberByCode(shop, params[0]), b = await readBody(req), delta = Number(b.delta), reason = str(b.reason, 60, 1);
      if (delta !== 1 && delta !== -1) fail(400, "invalid");
      q("UPDATE members SET stamps = MAX(0, stamps + ?) WHERE id = ?").run(delta, m.id);
      q("INSERT INTO adjustments (shop_id, member_id, delta, reason, created) VALUES (?, ?, ?, ?, ?)").run(shop.id, m.id, delta, reason, Date.now());
      return [200, { member: pubMember(q("SELECT * FROM members WHERE id = ?").get(m.id), shop) }];
    }],
    ["DELETE", /^\/api\/member\/([A-Za-z0-9]{4,8})$/, async ({ req, params }) => {
      const shop = myShop(req), m = memberByCode(shop, params[0]);
      q("DELETE FROM members WHERE id = ?").run(m.id); // their visits and redemptions go too
      return [200, { ok: true }];
    }],
    ["GET", "/api/export/members.csv", async ({ req }) => {
      const shop = myShop(req), rows = q("SELECT * FROM members WHERE shop_id = ? ORDER BY created").all(shop.id);
      return [200, csv([["code", "name", "phone", "offers_ok", "stamps", "joined", "last_visit", "birth_month"], ...rows.map((m) => [m.code, m.name, m.phone, m.mkt ? "yes" : "no", m.stamps, when(m.created), when(m.last_visit), m.birth_month || ""])]), csvHead(`${shop.slug}-members.csv`)];
    }],
    ["GET", "/api/export/visits.csv", async ({ req }) => {
      const shop = myShop(req), rows = q("SELECT v.*, m.code, m.name FROM visits v JOIN members m ON m.id = v.member_id WHERE v.shop_id = ? ORDER BY v.created").all(shop.id);
      return [200, csv([["date", "member_code", "member_name", "receipt", "amount_rm"], ...rows.map((v) => [when(v.created), v.code, v.name, v.receipt, (v.amount / 100).toFixed(2)])]), csvHead(`${shop.slug}-visits.csv`)];
    }],
    ["POST", "/api/offer", async ({ req }) => {
      const shop = myShop(req), b = await readBody(req), m = memberByCode(shop, b.code), why = b.why === "birthday" ? "birthday" : "back";
      q("UPDATE members SET last_offer = ? WHERE id = ?").run(Date.now(), m.id);
      q("INSERT INTO events (shop_id, kind, meta, created) VALUES (?, 'offer', ?, ?)").run(shop.id, JSON.stringify({ why }), Date.now());
      return [200, { ok: true }];
    }],
    ["POST", "/api/event", async ({ req }) => {
      const shop = myShop(req), b = await readBody(req);
      if (!["poster", "week"].includes(b.kind)) fail(400, "invalid");
      q("INSERT INTO events (shop_id, kind, meta, created) VALUES (?, ?, ?, ?)").run(shop.id, b.kind, JSON.stringify({ look: str(b.look ?? "", 12) }), Date.now());
      return [200, { ok: true }];
    }],

    // ---- customer page (public) ----
    // the logo is public like the rest of the customer page; ?v= changes with every upload, so it can be cached for good
    ["GET", /^\/api\/s\/([a-z0-9-]{1,40})\/logo$/, async ({ params, url }) => {
      const shop = shopBySlug(params[0]);
      if (!shop.logo) fail(404, "not_found");
      return [200, shop.logo, { "content-type": shop.logo_type, "cache-control": url.searchParams.has("v") ? "public, max-age=31536000, immutable" : "no-cache" }];
    }],
    ["GET", /^\/api\/s\/([a-z0-9-]{1,40})$/, async ({ params }) => [200, { shop: pubShop(shopBySlug(params[0])) }]],
    ["POST", /^\/api\/s\/([a-z0-9-]{1,40})\/event$/, async ({ req, ip, params }) => {
      const shop = shopBySlug(params[0]), b = await readBody(req);
      limit(`ev:${ip}:${shop.id}`, 120, 3600e3);
      if (!["scan", "write", "share"].includes(b.kind)) fail(400, "invalid");
      const plat = b.kind === "share" ? (PLATS.includes(b.plat) ? b.plat : fail(400, "invalid")) : null;
      const meta = b.kind === "write" ? JSON.stringify({ vibes: (Array.isArray(b.vibes) ? b.vibes : []).slice(0, 3).map((v) => str(v, 12, 1)), style: str(b.style ?? "", 12) }) : null;
      q("INSERT INTO events (shop_id, kind, plat, meta, created) VALUES (?, ?, ?, ?, ?)").run(shop.id, b.kind, plat, meta, Date.now());
      return [200, { ok: true }];
    }],
    ["POST", /^\/api\/s\/([a-z0-9-]{1,40})\/join$/, async ({ req, ip, params }) => {
      const shop = shopBySlug(params[0]), b = await readBody(req);
      limit(`join:${ip}`, 10, 3600e3);
      if (b.terms !== true) fail(400, "need_terms");
      const name = str(b.name, 30, 1), phone = str(b.phone ?? "", 20).replace(/[^\d+]/g, "");
      if (phone && !/^\+?\d{7,15}$/.test(phone)) fail(400, "bad_phone");
      const token = randomBytes(24).toString("base64url");
      let code;
      do code = newCode(); while (q("SELECT 1 FROM members WHERE shop_id = ? AND code = ?").get(shop.id, code));
      const birth = b.birthMonth ? int(b.birthMonth, 1, 12) : 0; // optional, for a birthday treat
      q("INSERT INTO members (shop_id, token, code, name, phone, mkt, created, birth_month) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(shop.id, token, code, name, phone, b.mkt === true && phone ? 1 : 0, Date.now(), birth);
      return [201, { token, member: pubMember(q("SELECT * FROM members WHERE token = ?").get(token), shop) }];
    }],
    ["GET", /^\/api\/s\/([a-z0-9-]{1,40})\/card\/([\w-]{20,64})$/, async ({ params }) => {
      const shop = shopBySlug(params[0]);
      return [200, { member: pubMember(cardOf(shop, params[1]), shop) }];
    }],
    // the card holder can stop offers or leave; the token on their phone is the proof
    ["POST", /^\/api\/s\/([a-z0-9-]{1,40})\/card\/([\w-]{20,64})\/optout$/, async ({ params }) => {
      const shop = shopBySlug(params[0]), m = cardOf(shop, params[1]);
      q("UPDATE members SET mkt = 0 WHERE id = ?").run(m.id);
      return [200, { member: pubMember(q("SELECT * FROM members WHERE id = ?").get(m.id), shop) }];
    }],
    ["DELETE", /^\/api\/s\/([a-z0-9-]{1,40})\/card\/([\w-]{20,64})$/, async ({ params }) => {
      q("DELETE FROM members WHERE id = ?").run(cardOf(shopBySlug(params[0]), params[1]).id);
      return [200, { ok: true }];
    }],
  ];

  async function serveStatic(res, path) {
    let file;
    try { file = normalize(join(ROOT, decodeURIComponent(path === "/" ? "/index.html" : path))); } catch { file = ""; }
    if (!file.startsWith(ROOT + sep)) { res.writeHead(404); return res.end("Not found"); }
    try {
      const data = await readFile(file);
      res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream", "cache-control": "no-cache", ...SAFE, ...(file.endsWith(sep + "index.html") ? { "content-security-policy": CSP } : {}) });
      res.end(data);
    } catch { res.writeHead(404); res.end("Not found"); }
  }

  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://local"), path = url.pathname, ip = req.socket.remoteAddress;
    try {
      if (!path.startsWith("/api/")) {
        if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, { error: "method" });
        return await serveStatic(res, path);
      }
      for (const [method, pattern, fn] of ROUTES) {
        if (method !== req.method) continue;
        const params = typeof pattern === "string" ? (pattern === path ? [] : null) : path.match(pattern)?.slice(1);
        if (!params) continue;
        const [code, body, headers] = await fn({ req, url, ip, params });
        return send(res, code, body, headers);
      }
      send(res, 404, { error: "not_found" });
    } catch (e) {
      if (e instanceof Bad) return send(res, e.code, { error: e.message });
      console.error(e);
      send(res, 500, { error: "server" });
    }
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const port = Number(process.env.PORT) || 3500;
  const db = openDb(process.env.DB || resolve(import.meta.dirname, "..", "data", "goai.db"));
  makeServer(db).listen(port, () => console.log(`Go AI running on http://localhost:${port}`));
}
