# Go AI

The working app. Shop owners sign up, make posters for every platform, and put a QR on the counter. Customers post their own story and join as members. Staff stamp members' cards against a receipt, and the report is built from what really happened.

## Run it

Needs Node 22.13 or newer. There is nothing to install, and nothing in the app calls a paid service.

```bash
npm start
```

Open http://localhost:3500. The database is created at `data/goai.db`.

```bash
npm test
```

The test boots the server on an in-memory database and walks the real flows:
- sign up, the customer page, joining, stamps, duplicate receipts, undoing a stamp, redeeming, the report
- quiet members and offers
- the staff PIN: a wrong PIN, what a staff device can and cannot do, finding a member by phone, sign-out on a new PIN, the rate limit
- CSV export, leaving, removing a member, changing the password, deleting the account
- a member's history, stamp corrections (one at a time, with a reason, never below zero), birth months and birthday offers
- the brand kit: handle and colour, and a logo checked by its bytes as well as its type
- shop details: address, phone, a maps link and the week's hours
- rewards: the stamp goal and reward, the comeback offer and when it goes out, and the birthday treat
- the shop font
- the report list, one month, and the full report
- item prices

The page has its own check too. Open any page with `?selftest` (for example `http://localhost:3500/?selftest`). It writes posts for every shop type, every chip, both languages and all 8 platforms, and checks them. It also paints all 22 looks at three sizes, checks every caption the built-in writer can produce, and checks the festival calendar.

### Day to day

```bash
npm run backup
```

This copies the live database into `backups/` (the newest 30 are kept). It is safe while the app is running, so it can run from a daily scheduled task.

```bash
npm run admin -- shops
```

This lists every shop with its owner's email and member count.

```bash
npm run admin -- reset-password owner@example.com
```

This gives that owner a new random password and signs them out everywhere. It is how to help an owner who forgot their password until email reset exists.

### Settings

Settings come from environment variables:

| Variable | Default | Use |
|---|---|---|
| `PORT` | `3500` | Port to listen on |
| `DB` | `data/goai.db` | SQLite file |
| `SECURE` | not set | Set to `1` behind HTTPS so cookies are `Secure` and HSTS is sent |
| `TZ` | `Asia/Kuala_Lumpur` | Where month boundaries fall in the report and CSV times |
| `BACKUP_DIR` | `backups/` | Where `npm run backup` writes |

### Putting it online

`Dockerfile` builds one small container (Node 24 on Alpine) that keeps the database on a `/data` volume and has a health check at `/api/health`. Put it behind any HTTPS proxy (Caddy, Fly.io, Render or a VPS with nginx) and set `SECURE=1`. It has not been built on this PC, which has no Docker.

## What is real now

- **Owner accounts.** Sign up, log in and log out. Passwords are hashed with scrypt and sessions use an HttpOnly cookie. Log-in, sign-up, join, PIN and customer events are rate limited.
  - Settings can change the password, which signs out the owner's other phones.
  - Settings can delete the shop and all its data, after typing the password.
- **Home.** The shop's own signboard (in the brand colour when it is dark enough for cream lettering, with the logo and the shop name in its font) with two buttons: Upload logo (or Change logo), and Font, which opens the font choices drawn in the shop's own name. Then one big "Snap a photo" button that opens Create with the photo already in it.
  - This month's numbers, all from the database: member spend from receipts, posts made and new members.
  - The next setup step, ticked off from real data, until all six are done: items added, staff PIN set, first QR scan, first poster, first member, Google review link.
- **Shop types.** Café, restaurant, bakery and desserts, drinks and bubble tea, hair and barber, beauty and nails, pet shop, florist, fashion and retail, or other.
  - Each type brings its own customer chips ("Chewy pearls", "They listened", "Lovely wrapping"…), occasions, hashtags, page colour, poster wording, stamp goal, and default reward and offer, in English and 中文.
  - To add a type, add an entry to `TYPES` in `app/app.js`, its `m.<type>` name, and its key in `TYPES` in `server/server.js`. The page selftest then checks its posts on every platform.
- **Shop settings.** Name, type, city, the items customers pick from (English and 中文, with an optional price), Google review link and staff PIN.
  - **Rewards:** three cards with one-tap ideas. Membership reward: stamps for a reward (a − / + stepper from 3 to 20; a reward written as "8 stamps = …" follows the number) and what a full card earns. Comeback offer: what it is and how many days without a visit before it goes out (14 to 90). Birthday treat: what members get in their birthday month; left empty, it is the comeback offer.
  - The birthday treat shows in the birthday WhatsApp message, on the join form, on the member's card in their birthday month, on the staff screen when their card is found, and in the Members rules.
  - **Shop details:** address, shop phone or WhatsApp, an optional Google Maps link, and opening hours for each day ("Use Monday's hours for every day" copies them). Customers see them on their page, the hours notice starts from them, the print kit can show them, and the report statement carries the address.
  - **Your brand:** a logo (resized on the phone to 512 px and stored on the server, 250 KB at most, PNG, JPEG or WebP checked by its first bytes), the shop's real social handle, and a brand colour from 12 swatches or a custom one.
  - **Shop font:** each look's own fonts, or one of Bold, Poster (condensed), Elegant, Friendly, Handwritten and Modern. It letters the shop name on Home, the customer page, the print kit, the A4 poster and the report, and the headings of every poster. Small labels keep their own type, and a font wider than the look's own is set smaller so the layout holds.
  - **The logo sets the theme:** uploading a logo reads its main colours on the phone (paper white and soft edges are ignored), makes the strongest one the brand colour, and offers the others as swatches. The owner app, the customer page and the staff screen then use that colour for buttons and highlights, darkened where needed so white text on it stays readable. The landing page and log-in stay Go AI red.
- **Create.** The owner uploads their own photo, picks one of 22 looks, and gets one image per platform at the right size: Facebook, Instagram, Xiaohongshu, TikTok, Threads, Lemon8 and WhatsApp Status (9:16, posted from the phone's WhatsApp, so it has no "Open" button).
  - **Several photos:** up to 6 at once, from Create or the Home button, and more can be added or removed on the edit screen. Two or more become one collage: Grid, One big, or Side by side. Each photo gets the light fix on its own first, and every poster lays the photos out afresh for its own photo area and size (side by side where it is wide, stacked where it is tall), so no photo is cut away. Customers can pick several photos too.
  - **Light and colour:** Off, Natural (the default) or Bold. On the phone: levels from the photo's own histogram, grey-world white balance, a lift for dark photos, vibrance and a light sharpen. Customer photos get Natural too.
  - **Quick presets:** New item launch, Weekend promo, Best seller, Festive special, Today only, Members treat, Buy 1 free 1, Kopitiam classic, Menu card, and Clean and simple. Each sets a look and a badge in one tap.
  - **Customize:** a font for this post (the shop font by default, each look's own, or any of the six); a badge (NEW, Best seller, Must try, Promo, Limited, Buy 1 free 1, Members only, Today only, or the owner's own words) as a round stamp, a hanging tag or a corner ribbon, in any corner or placed by the look so it misses the title; the colour (the brand, the photo's own, or 12 swatches); and the logo on or off. The week planner leaves badges off.
  - **Framing:** the big frame shows the chosen look as a poster. Dragging it (or the arrow keys) moves the photo, and a zoom slider goes to 220%. Every size and every look keeps the same part of the photo.
  - With a brand colour set, posters use it instead of the photo's colour (a switch on Create turns that off for one post). The logo sits on a small white plate on owner posters, never on customer posts, placed per look so it does not cover the title.
  - The looks are Clean, Premium, Fun, Festive, Menu card, Polaroid, Kopitiam, Colour block, Gallery, Chalkboard, Neon, Duotone, Risograph, Batik, Contact sheet, Ticket, and the six customer frames (Xiaohongshu cover, Magazine, Receipt, Film, Cute, Simple). Customers swipe through the same 22.
  - They follow one design system, written up in `design/poster-philosophy.md` with a contact sheet in `design/posters-contact-sheet.jpg`: a fixed margin, three type sizes at most, prices set as type, a fine print grain, and colour taken from the photo itself (the strongest hue near the middle of the frame), so a matcha poster turns green and a nasi lemak poster turns chilli red.
  - Festive follows the calendar: Deepavali, Christmas, Chinese New Year, Hari Raya, Merdeka, Malaysia Day or Mid-Autumn, whichever is on or next. Moon-sighted and lunar dates are listed in `FEST_DAYS` in `app/app.js` and need checking against the official holiday list each year.
  - Captions are written on the phone, free and offline. The writer reads what the item is from its name (kopi, matcha, bubble tea, noodles, a haircut, nails, flowers and 10 other kinds) and talks about it the way people talk about that thing, notices iced drinks ("Malaysian heat? This helps."), uses the shop's own other items for "Team kopi or team kaya toast?" and pairings, fits the moment (morning, after work, weekend, payday, a festival), speaks in the look's voice, and picks an emoji and up to 5 hashtags. "Write another" goes through four shapes of caption. Nothing about taste, awards or deals is made up.
  - "Save for N platforms" uses the phone's share sheet, or downloads on a computer, and copies the caption.
  - A calendar reminder (.ics) is offered for 7:30 pm.
  - "Make my whole week" makes 7 posts plus a festive one, with 7 calendar reminders.
  - "Plan my month" lists good days to post in the next 30 days: each festival, the week before it (a notice for festival hours or an offer), payday (the 25th, or the weekday before when it falls on a weekend), the 1st and every Saturday, each with an idea of what to shoot and a look. Ticked days go into one calendar file whose reminders link back to Create. "Make it now" starts that post with its look picked.
- **Notices.** From Create, without a photo: closed for a festival (dates default to the next one), new opening hours, a promotion, staff wanted, or the menu board.
  - Three designs: Signboard (enamel in the brand colour, four screws), Paper (a note taped inside the glass door, signed in pen) and Bold (Swiss type).
  - English or 中文, sized for Facebook, Instagram, Xiaohongshu, TikTok, Threads, Lemon8 and a WhatsApp status, with a caption written from the fields.
  - The menu board starts from the shop's items and the prices set in Settings, first 8 ticked, and lays them out as a price list with dot leaders.
- **Customer page** at `/#/c/<shop-link>` (the QR on the Share tab).
  - Customers use their own photo and three taps, then get 8 platform posts with the content check.
  - Every customer screen ends with the shop's details when they are set: open now or closed, the week's hours, the address with Directions, and Call and WhatsApp buttons.
  - Google reviews use the shop's review link and the customer's own stars.
  - Joining creates a real member with a 6-character code and a QR card saved on their phone. A birth month is optional ("For a birthday treat").
  - From the card, a member can stop WhatsApp offers or leave, which deletes their card, stamps and visits.
  - A plain-language privacy notice for each shop is at `/#/privacy/<shop-link>`. It says what is kept, that photos never leave the phone, who sees the data, and how to leave.
  - Phones set to Chinese open in 中文.
- **Print kit** (the Share tab). The customer QR in five sizes: a table card (10 × 14 cm), a round sticker (6 cm, 12 on one A4), a name card (9 × 5.4 cm, 10 on one A4, edge to edge with cut lines), an A5 counter stand, and the A4 poster.
  - Eight designs (Classic, Brand colour, Kopitiam, Night, Sunny, Minimal, Pandan and Festive, which follows the calendar), five headlines ("Scan, tap, post", "Post your photo, get a stamp", "Snap, share, get rewarded", "Join free, collect stamps", "Love it? Post it!") or the owner's own words, and English, 中文 or both.
  - Show or hide the logo, shop name, reward, app icons, and address and hours.
  - The preview shrinks to fit the phone; printing is always true size. The choices are remembered on that phone. The QR always sits on white so it scans on every design.
  - The A4 poster is drawn in the shop's colour in Chinese and English: the QR on a white plate, three numbered steps (scan, post, collect stamps) and the reward. It prints full-bleed, and "Save A4 poster" downloads a 1240 × 1754 JPEG for a print shop.
- **Staff.**
  - Find a member by scanning their QR with the camera (Android Chrome), by typing the code, or, when they forgot their card, by the phone number they joined with (the last 9 digits are matched, so 012-345 6789 and +60 12-345 6789 both work).
  - Add a stamp with the receipt number and total. The same receipt cannot be used twice.
  - A mistaken stamp can be undone for 10 minutes.
  - Rewards are redeemed when the goal is reached.
  - A member whose birthday is this month shows "🎂 Birthday this month".
- **Staff PIN.** The owner sets a 4 to 6 digit PIN in Settings (hashed with scrypt).
  - Counter staff open `/#/staff/<shop-link>` and type the PIN once per device.
  - That device can only find members, stamp, undo and redeem for that shop. It has no access to the report, member list or settings.
  - Saving a new PIN signs out every staff device.
- **Members.** A real list with stamps, last visit and offer opt-in, searchable by name, code or phone once there are more than 5.
  - Tapping a name opens the member: their card, every stamped visit with its receipt and total, rewards, corrections, a WhatsApp button, and remove.
  - Stamp corrections are +1 or −1 with a reason (missed a stamp, stamped twice, goodwill), recorded, and never take a card below zero.
  - "Birthdays this month" lists members who gave that month and said yes to offers, each with a WhatsApp birthday message using the welcome-back offer. The owner presses send, as with every offer.
  - Members who said yes and have gone quiet get a welcome-back offer through WhatsApp click-to-chat. The message is written for the owner, the owner presses send, and Go AI records that it went out.
  - "Download your data" exports members and visits (with receipts and totals) as CSV. Cells are quoted, and anything that looks like a spreadsheet formula is defused.
- **Report.** Opens on a list of every month since the shop joined (up to three years), each with member spend, visits and new members, and "Generate" for that month. "Generate full report" adds every month together: totals, member spend against the plan's price for that many months, a month-by-month chart and table, and the platform, loved, style and busiest-day panels across all of it.
  - One month is laid out as a printed monthly statement: the shop's enamel band, the headline figure, member spend against the plan's price, and a torn edge. Then scans, posts written, share taps by platform, what customers loved, styles, joins, stamped visits, member spend from receipts, running totals against last month, and the busiest days of the week (stamped visits from that month and the one before, shown once there are at least 20). A finished month is compared with the whole month before it; the current month with the same days last month. Every number comes from the database.
- **Install.** The app has a web manifest, so owners and staff can add it to their phone's home screen.
- **Security.**
  - The app page sends a Content Security Policy. Scripts may only come from this server, cdnjs and jsDelivr, and the page cannot be framed.
  - Every response sends `nosniff`, a strict referrer policy and a permissions policy that allows the camera for this site only.
  - Owner-typed text is escaped everywhere.

The landing page opens on a shophouse signboard in kopitiam enamel green: "Superpower your shop." big in the page's language and small in the other (给小店装上超能力), four powers (AI posters in 60 seconds, AI captions for 8 apps, Membership system, Monthly report), the 8 platform icons on a cream keyline, and two buttons, all centred, with the stamped photo hanging from the sign's bottom edge. Then a shop window of six posters made from one photo, one per platform at its real size (`design/landing-preview.jpg`). Below it, four steps show the real thing at each stage: a poster, a customer's phone, a stamp card and the report. A dropdown under "Try it with your shop's name" switches between example shops for 9 of the 10 types; florist has no example photo yet. The footer says the shops and photos are examples, and the photos are AI-generated.

## Not built yet

These need outside accounts or business decisions:

- Posting for the owner automatically: Meta (Facebook, Instagram, Threads) and TikTok APIs. Xiaohongshu and Lemon8 have no open posting API.
- Sending WhatsApp messages without the owner pressing send (WhatsApp Business API).
- AI background replacement for owner photos.
- Pulling receipt totals from the shop's POS instead of staff typing them.
- Billing, and password reset by email (an operator can reset with `npm run admin`).
- Staff logins per person. Today there is one shared PIN per shop, so the app cannot tell which staff member stamped a card.
- Moving rate limits into the database once there is more than one server.
- A legal review of the privacy notice and membership terms for Malaysia's PDPA. The notice in the app is a plain-language starting point, not legal advice.

## Pitch demo

`prototype/` is the earlier pitch demo with its sample shops and simulated flows, kept as it was. It is static: open it with any static server.
