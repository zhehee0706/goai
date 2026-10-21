// Run: node server/test.js — boots the server on an in-memory database and walks the real flows.
import assert from "node:assert/strict";
import { openDb } from "./db.js";
import { makeServer } from "./server.js";

const db = openDb(":memory:");
const srv = makeServer(db);
await new Promise((r) => srv.listen(0, r));
const base = `http://localhost:${srv.address().port}`;
const owner = { cookie: "" };
async function call(method, path, body, { auth = true, jar = owner } = {}) {
  const r = await fetch(base + path, { method, headers: { "content-type": "application/json", ...(auth && jar.cookie ? { cookie: jar.cookie } : {}) }, body: body && JSON.stringify(body) });
  const sc = r.headers.get("set-cookie");
  if (sc) jar.cookie = sc.split(";")[0];
  return { status: r.status, body: await r.json().catch(() => null) };
}
const shopIn = { name: "Ah Seng Kopitiam", type: "cafe", ownerName: "Seng", city: "Johor Bahru", items: [{ en: "Kopi O", zh: "咖啡乌" }], goal: 3, reward: "3 stamps = 1 free kopi", offer: "RM3 off", quietDays: 30 };

// account
assert.equal((await call("GET", "/api/me")).body.shop, null, "logged out at start");
assert.equal((await call("POST", "/api/signup", { ...shopIn, email: "a@b.co", password: "short" })).status, 400, "short password rejected");
const su = await call("POST", "/api/signup", { ...shopIn, email: "Seng@Example.com", password: "kopi-o-kosong" });
assert.equal(su.status, 201);
assert.equal(su.body.shop.slug, "ah-seng-kopitiam");
assert.equal((await call("POST", "/api/signup", { ...shopIn, email: "seng@example.com", password: "kopi-o-kosong" })).status, 409, "email is unique");
assert.equal((await call("GET", "/api/me")).body.shop.name, "Ah Seng Kopitiam");
const up = await call("PUT", "/api/shop", { ...shopIn, items: [...shopIn.items, { en: "Kaya Toast" }], reviewUrl: "javascript:alert(1)" });
assert.equal(up.status, 400, "review link must be https");
assert.equal((await call("PUT", "/api/shop", { ...shopIn, items: [...shopIn.items, { en: "Kaya Toast" }] })).body.shop.items.length, 2);
const priced = await call("PUT", "/api/shop", { ...shopIn, items: [{ en: "Kopi O", zh: "咖啡乌", price: "RM 2.20" }, { en: "Kaya Toast" }] });
assert.equal(priced.body.shop.items[0].price, "RM 2.20", "items can carry a price for the menu board");
assert.equal(priced.body.shop.items[1].price, undefined, "a price is optional");
assert.equal((await call("PUT", "/api/shop", { ...shopIn, items: [{ en: "Kopi O", price: "RM 2.20 and a very long price" }] })).status, 400, "prices stay short");

// the report list: one month at a time, or every month together
{
  const ms = await call("GET", "/api/report/months");
  assert.equal(ms.status, 200);
  assert.ok(ms.body.months.length >= 1 && ms.body.months[0].offset === 0, "the list starts with this month");
  const one = await call("GET", "/api/report/month/0");
  assert.ok(one.body.this && one.body.last, "a month comes with the month before it");
  assert.equal((await call("GET", "/api/report/month/40")).status, 404, "no months before the shop joined");
  const all = await call("GET", "/api/report/all");
  assert.equal(all.body.months.length, ms.body.months.length);
  assert.equal(all.body.total.returns, all.body.months.reduce((a, r) => a + r.returns, 0), "the full report adds the months up");
  assert.equal((await call("GET", "/api/report/all", null, { auth: false })).status, 401, "reports are for the owner");
}

// the shop's font
{
  assert.equal((await call("PUT", "/api/shop/font", { font: "comic" })).status, 400, "only the fonts on offer");
  assert.equal((await call("PUT", "/api/shop/font", { font: "elegant" })).body.shop.font, "elegant");
  assert.equal((await call("PUT", "/api/shop/font", { font: "" })).body.shop.font, "", "back to each look's own");
}

// rewards: the stamp goal and reward, the comeback offer and its timing, and the birthday treat
{
  assert.equal((await call("PUT", "/api/shop/rewards", { goal: 2, reward: "", offer: "", quietDays: 30, bday: "" })).status, 400, "at least 3 stamps");
  assert.equal((await call("PUT", "/api/shop/rewards", { goal: 8, reward: "", offer: "", quietDays: 3, bday: "" })).status, 400, "quiet means a week or more");
  const r = await call("PUT", "/api/shop/rewards", { goal: 10, reward: "10 stamps = 1 free kopi", offer: "RM5 off", quietDays: 45, bday: "A free slice of cake" });
  assert.equal(r.status, 200);
  assert.deepEqual([r.body.shop.goal, r.body.shop.reward, r.body.shop.offer, r.body.shop.quietDays, r.body.shop.bday], [10, "10 stamps = 1 free kopi", "RM5 off", 45, "A free slice of cake"]);
  const back = await call("PUT", "/api/shop/rewards", { goal: shopIn.goal, reward: shopIn.reward, offer: shopIn.offer, quietDays: shopIn.quietDays, bday: "" }); // the flows below expect the shop as it signed up
  assert.equal(back.body.shop.bday, "", "an empty treat falls back to the offer");
}

// shop details: address, phone, a maps link and the week's hours
{
  const week = [["08:00", "22:00"], ["08:00", "22:00"], ["08:00", "22:00"], ["08:00", "22:00"], ["08:00", "23:30"], ["09:00", "23:30"], null];
  assert.equal((await call("PUT", "/api/shop/details", { address: "", phone: "12", maps: "", hours: week })).status, 400, "a shop phone is a phone number");
  assert.equal((await call("PUT", "/api/shop/details", { address: "", phone: "", maps: "http://x.y", hours: week })).status, 400, "a maps link is https");
  assert.equal((await call("PUT", "/api/shop/details", { address: "", phone: "", maps: "", hours: week.slice(1) })).status, 400, "hours cover 7 days");
  const d = await call("PUT", "/api/shop/details", { address: "12 Jalan Bandar, Ipoh", phone: "05-254 1234", maps: "https://maps.app.goo.gl/abc", hours: [...week.slice(0, 6), ["25:00", "26:00"]] });
  assert.equal(d.status, 200);
  assert.equal(d.body.shop.phone, "052541234");
  assert.deepEqual(d.body.shop.hours[0], ["08:00", "22:00"]);
  assert.equal(d.body.shop.hours[6], null, "a time that is not a time means closed");
  assert.equal((await call("GET", `/api/s/${d.body.shop.slug}`, null, { auth: false })).body.shop.address, "12 Jalan Bandar, Ipoh", "customers see the address");
}

// brand kit: handle and colour, and a logo checked by its bytes
assert.equal((await call("PUT", "/api/shop/brand", { handle: "@ah seng", brand: "" })).status, 400, "a handle has no spaces");
assert.equal((await call("PUT", "/api/shop/brand", { handle: "", brand: "red" })).status, 400, "a brand colour is a hex colour");
const br = await call("PUT", "/api/shop/brand", { handle: "@ahseng.kopitiam", brand: "#1e5b3a" });
assert.equal(br.body.shop.handle, "ahseng.kopitiam");
assert.equal(br.body.shop.brand, "#1E5B3A");
const png = Buffer.from("89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d4944415478da63f8ffff3f0005fe02fea7d6a0a50000000049454e44ae426082", "hex");
assert.equal((await call("PUT", "/api/shop/logo", { type: "image/png", data: Buffer.from("<svg onload=alert(1)>").toString("base64") })).status, 400, "only real images are kept");
assert.equal((await call("PUT", "/api/shop/logo", { type: "image/jpeg", data: png.toString("base64") })).status, 400, "the bytes must match the type");
const lg = await call("PUT", "/api/shop/logo", { type: "image/png", data: png.toString("base64") });
assert.equal(lg.status, 200);
assert.ok(lg.body.shop.logoAt > 0);
const logoRes = await fetch(`${base}/api/s/${lg.body.shop.slug}/logo?v=${lg.body.shop.logoAt}`);
assert.equal(logoRes.headers.get("content-type"), "image/png");
assert.match(logoRes.headers.get("cache-control"), /immutable/);
assert.deepEqual(Buffer.from(await logoRes.arrayBuffer()), png, "the logo comes back byte for byte");
assert.equal((await call("DELETE", "/api/shop/logo")).body.shop.logoAt, 0);
assert.equal((await fetch(`${base}/api/s/${lg.body.shop.slug}/logo`)).status, 404, "no logo after removing it");

// customer page, no login
const slug = su.body.shop.slug;
assert.equal((await call("GET", `/api/s/${slug}`, null, { auth: false })).body.shop.name, "Ah Seng Kopitiam");
assert.equal((await call("POST", `/api/s/${slug}/event`, { kind: "scan" }, { auth: false })).status, 200);
assert.equal((await call("POST", `/api/s/${slug}/event`, { kind: "write", vibes: ["tasty", "cosy"], style: "xhs" }, { auth: false })).status, 200);
assert.equal((await call("POST", `/api/s/${slug}/event`, { kind: "share", plat: "ig" }, { auth: false })).status, 200);
assert.equal((await call("POST", `/api/s/${slug}/event`, { kind: "share", plat: "myspace" }, { auth: false })).status, 400, "unknown platform rejected");
assert.equal((await call("POST", `/api/s/${slug}/join`, { name: "Aina" }, { auth: false })).status, 400, "terms required");
assert.equal((await call("POST", `/api/s/${slug}/join`, { name: "Bad Month", terms: true, birthMonth: 13 }, { auth: false })).status, 400, "a birth month is 1 to 12");
const join = await call("POST", `/api/s/${slug}/join`, { name: "Aina", phone: "+60 12-345 6789", mkt: true, terms: true, birthMonth: 11 }, { auth: false });
assert.equal(join.status, 201);
// one member's history, and owner stamp corrections with a reason
{
  const code = join.body.member.code;
  assert.equal(join.body.member.birthMonth, 11, "the birth month is kept");
  const h = await call("GET", `/api/member/${code}/history`);
  assert.equal(h.status, 200);
  assert.ok(Array.isArray(h.body.visits) && Array.isArray(h.body.rewards) && Array.isArray(h.body.fixes));
  assert.equal((await call("GET", `/api/member/${code}/history`, null, { auth: false })).status, 401, "history is for the owner only");
  assert.equal((await call("POST", `/api/member/${code}/adjust`, { delta: 2, reason: "x" })).status, 400, "one stamp at a time");
  assert.equal((await call("POST", `/api/member/${code}/adjust`, { delta: 1, reason: "" })).status, 400, "a correction needs a reason");
  const before = h.body.member.stamps, up = await call("POST", `/api/member/${code}/adjust`, { delta: 1, reason: "Missed a stamp on Friday" });
  assert.equal(up.body.member.stamps, before + 1);
  for (let i = 0; i < before + 3; i++) await call("POST", `/api/member/${code}/adjust`, { delta: -1, reason: "Test" });
  assert.equal((await call("GET", `/api/member/${code}/history`)).body.member.stamps, 0, "never below zero");
  assert.equal((await call("GET", `/api/member/${code}/history`)).body.fixes[0].reason, "Test", "corrections are logged, newest first");
  assert.equal((await call("POST", `/api/member/${code}/adjust`, { delta: 1, reason: "Back to one" })).body.member.stamps, 1);
  await call("POST", `/api/member/${code}/adjust`, { delta: -1, reason: "Back to zero" }); // leave the card as the flows below expect it
}

const { token, member } = join.body;
assert.match(member.code, /^[A-HJ-NP-Z2-9]{6}$/);
assert.equal((await call("GET", `/api/s/${slug}/card/${token}`, null, { auth: false })).body.member.stamps, 0);

// staff, needs the owner's login
assert.equal((await call("POST", "/api/stamp", { code: member.code, receipt: "A1", amount: 9.5 }, { auth: false })).status, 401, "stamping needs login");
assert.equal((await call("POST", "/api/stamp", { code: member.code, receipt: "a1", amount: 9.5 })).body.member.stamps, 1);
assert.equal((await call("POST", "/api/stamp", { code: member.code, receipt: "A1 ", amount: 9.5 })).status, 409, "duplicate receipt rejected");
assert.equal((await call("POST", "/api/redeem", { code: member.code })).status, 409, "cannot redeem before the goal");
await call("POST", "/api/stamp", { code: member.code, receipt: "A2", amount: 12 });
await call("POST", "/api/stamp", { code: member.code, receipt: "A3", amount: 8.25 });
assert.equal((await call("POST", "/api/redeem", { code: member.code })).body.member.stamps, 0, "redeem takes the goal off");
await call("POST", "/api/event", { kind: "poster", look: "fun" });

// report
const rep = (await call("GET", "/api/report")).body;
assert.equal(rep.this.scans, 1);
assert.equal(rep.this.writes, 1);
assert.deepEqual(rep.this.byPlat, { ig: 1 });
assert.deepEqual(rep.this.loved, { tasty: 1, cosy: 1 });
assert.equal(rep.this.joins, 1);
assert.equal(rep.this.returns, 3);
assert.equal(rep.this.spend, 29.75);
assert.equal(rep.this.redeemed, 1);
assert.equal(rep.this.posters, 1);
assert.equal(rep.this.daily.writes.reduce((a, b) => a + b, 0), 1, "daily series adds up");
assert.equal(rep.members, 1);
assert.equal(rep.all.photos, 2);
assert.equal(rep.quietReach, 0, "a member seen today is not quiet");

// quiet members who said yes get one welcome-back offer per quiet spell
const old = Date.now() - 45 * 864e5;
db.prepare("UPDATE members SET created = ?, last_visit = ?").run(old, old);
assert.equal((await call("GET", "/api/report")).body.quietReach, 1, "45 days away with a 30-day window is quiet");
assert.equal((await call("POST", "/api/offer", { code: member.code, why: "birthday" })).status, 200, "a birthday offer is recorded like any offer");
const after = (await call("GET", "/api/report")).body;
assert.equal(after.quietReach, 0, "an offer was just sent");
assert.equal(after.this.offers, 1);

// staff PIN: a counter device can find members, stamp and redeem, and nothing else
const device = { cookie: "" }, staff = (method, path, body) => call(method, path, body, { jar: device });
assert.equal(su.body.shop.hasPin, false);
assert.equal((await staff("POST", `/api/staff/${slug}/login`, { pin: "4821" })).status, 409, "no PIN set yet");
assert.equal((await call("PUT", "/api/shop/pin", { pin: "48a1" })).status, 400, "PIN is 4 to 6 digits");
assert.equal((await call("PUT", "/api/shop/pin", { pin: "4821" })).body.shop.hasPin, true);
assert.equal((await staff("GET", `/api/staff/${slug}`)).body.ok, false, "a new device is locked");
assert.equal((await staff("POST", `/api/staff/${slug}/stamp`, { code: member.code, receipt: "S0" })).status, 401, "no PIN, no stamp");
assert.equal((await staff("POST", `/api/staff/${slug}/login`, { pin: "1111" })).status, 401, "wrong PIN rejected");
assert.equal((await staff("POST", `/api/staff/${slug}/login`, { pin: "4821" })).status, 200);
assert.equal((await staff("GET", `/api/staff/${slug}`)).body.ok, true);
assert.equal((await staff("GET", `/api/staff/${slug}/member/${member.code}`)).body.member.name, "Aina");
assert.equal((await staff("GET", `/api/staff/${slug}/phone/0123456789`)).body.member.code, member.code, "a forgotten card is found by the local phone number");
assert.equal((await staff("GET", `/api/staff/${slug}/phone/60123456789`)).body.member.code, member.code, "and by the international one");
assert.equal((await staff("GET", `/api/staff/${slug}/phone/0199999999`)).status, 404, "an unknown phone is not found");
assert.equal((await staff("POST", `/api/staff/${slug}/stamp`, { code: member.code, receipt: "S1", amount: 5 })).body.member.stamps, 1, "the staff device can stamp");
assert.equal((await staff("POST", `/api/staff/${slug}/stamp`, { code: member.code, receipt: "s1" })).status, 409, "duplicate receipt rejected for staff too");
for (const path of ["/api/report", "/api/members", `/api/member/${member.code}`, "/api/me"]) {
  const r = await staff("GET", path);
  assert.ok(r.status === 401 || r.body.shop === null, `the staff device cannot read ${path}`);
}
assert.equal((await staff("PUT", "/api/shop/pin", { pin: "0000" })).status, 401, "the staff device cannot change settings");
assert.equal((await call("POST", `/api/staff/${slug}/stamp`, { code: member.code, receipt: "S2" })).body.member.stamps, 2, "the owner can use the staff link too");
await staff("POST", `/api/staff/${slug}/stamp`, { code: member.code, receipt: "S3" });
assert.equal((await staff("POST", `/api/staff/${slug}/redeem`, { code: member.code })).body.member.stamps, 0, "the staff device can redeem");
await call("PUT", "/api/shop/pin", { pin: "482100" });
assert.equal((await staff("POST", `/api/staff/${slug}/stamp`, { code: member.code, receipt: "S4" })).status, 401, "a new PIN signs out staff devices");
let tries = 0, last;
do { last = (await staff("POST", `/api/staff/${slug}/login`, { pin: "9999" })).status; tries++; } while (last === 401 && tries < 30);
assert.equal(last, 429, "PIN tries are rate limited");
assert.ok(tries <= 10, `blocked after ${tries} more tries`);

// a mistaken stamp can be undone for 10 minutes, by staff or owner
const un0 = (await call("GET", `/api/member/${member.code}`)).body.member.stamps;
await call("POST", "/api/stamp", { code: member.code, receipt: "U1", amount: 3 });
assert.equal((await call("POST", "/api/unstamp", { code: member.code })).body.member.stamps, un0, "undo takes the stamp back");
assert.equal((await call("POST", "/api/stamp", { code: member.code, receipt: "U1", amount: 3 })).status, 200, "the receipt can be used again after undo");
db.prepare("UPDATE visits SET created = ?").run(Date.now() - 11 * 60e3);
assert.equal((await call("POST", "/api/unstamp", { code: member.code })).status, 409, "too late to undo after 10 minutes");

// health, and security headers on the app page
assert.equal((await call("GET", "/api/health")).body.ok, true);
const page = await fetch(base + "/");
assert.match(page.headers.get("content-security-policy") || "", /frame-ancestors 'none'/, "the app page has a CSP");
assert.equal(page.headers.get("x-content-type-options"), "nosniff");

// CSV export: owner only, spreadsheet-safe
const evil = await call("POST", `/api/s/${slug}/join`, { name: "=HYPERLINK(\"x\")", phone: "0123456780", terms: true }, { auth: false });
const raw = (path, jar = owner) => fetch(base + path, { headers: jar.cookie ? { cookie: jar.cookie } : {} });
const mcsv = await raw("/api/export/members.csv");
assert.equal(mcsv.status, 200);
assert.match(mcsv.headers.get("content-disposition"), /ah-seng-kopitiam-members\.csv/);
const mtext = await mcsv.text();
assert.ok(mtext.includes(`"'=HYPERLINK(""x"")"`), "a formula-looking name is defused");
assert.ok(mtext.includes(member.code), "members are listed");
assert.match(await (await raw("/api/export/visits.csv")).text(), /"receipt","amount_rm"[\s\S]*"A1","9.50"/, "visits list receipts and totals");
assert.equal((await raw("/api/export/members.csv", { cookie: "" })).status, 401, "export needs the owner");

// the card holder can stop offers and leave; the owner can remove a member
assert.equal((await call("POST", `/api/s/${slug}/card/${token}/optout`, null, { auth: false })).body.member.mkt, false, "offers stopped");
assert.equal((await call("DELETE", `/api/s/${slug}/card/${evil.body.token}`, null, { auth: false })).status, 200, "a member can leave");
assert.equal((await call("GET", `/api/s/${slug}/card/${evil.body.token}`, null, { auth: false })).status, 404, "and is gone");
const extra = await call("POST", `/api/s/${slug}/join`, { name: "Remove me", terms: true }, { auth: false });
assert.equal((await call("DELETE", `/api/member/${extra.body.member.code}`)).status, 200);
assert.equal((await call("GET", `/api/member/${extra.body.member.code}`)).status, 404, "the owner removed the member");
assert.equal((await staff("DELETE", `/api/member/${member.code}`)).status, 401, "a staff device cannot remove members");

// password change keeps this phone signed in and signs out the others
const other = { cookie: "" };
await call("POST", "/api/login", { email: "seng@example.com", password: "kopi-o-kosong" }, { jar: other });
assert.equal((await call("PUT", "/api/password", { old: "wrong", password: "new-kopi-pass" })).status, 401, "old password must match");
assert.equal((await call("PUT", "/api/password", { old: "kopi-o-kosong", password: "new-kopi-pass" })).status, 200);
assert.equal((await call("GET", "/api/me")).body.shop.slug, slug, "this phone stays signed in");
assert.equal((await call("GET", "/api/report", null, { jar: other })).status, 401, "other phones sign in again");
assert.equal((await call("POST", "/api/login", { email: "seng@example.com", password: "new-kopi-pass" }, { jar: other })).status, 200, "the new password works");

// another owner cannot see this shop's members
owner.cookie = "";
await call("POST", "/api/signup", { ...shopIn, name: "Other Shop", email: "other@example.com", password: "another-pass" });
assert.equal((await call("GET", `/api/member/${member.code}`)).status, 404, "members stay inside their shop");
assert.equal((await call("GET", `/api/staff/${slug}/member/${member.code}`)).status, 401, "another owner cannot use this shop's staff link");
assert.equal((await call("POST", "/api/logout", {})).status, 200);
assert.equal((await call("GET", "/api/report")).status, 401);

// deleting the account takes the shop and everything in it
owner.cookie = "";
await call("POST", "/api/login", { email: "seng@example.com", password: "new-kopi-pass" });
assert.equal((await call("POST", "/api/account/delete", { password: "nope" })).status, 401, "needs the password");
assert.equal((await call("POST", "/api/account/delete", { password: "new-kopi-pass" })).status, 200);
assert.equal((await call("GET", `/api/s/${slug}`, null, { auth: false })).status, 404, "the shop page is gone");
assert.equal(db.prepare("SELECT COUNT(*) n FROM members WHERE shop_id NOT IN (SELECT id FROM shops)").get().n, 0, "no members left behind");
assert.equal(db.prepare("SELECT COUNT(*) n FROM visits WHERE shop_id NOT IN (SELECT id FROM shops)").get().n, 0, "no visits left behind");

srv.close();
console.log("server test ok");
