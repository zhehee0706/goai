# Changelog

## 2026-10-21 (fifth round): several photos in one post

- Create, the Home "Snap a photo" button and the customer page take up to 6 photos at once. Two or more become one collage, in a Grid, One big, or Side by side layout.
- Each photo is fixed for light on its own, then every poster arranges the photos to fit its own photo area and size, so none is cropped away. The edit screen shows the photos with a remove button each and a tile to add more.

## 2026-10-21 (fourth round): logo from Home, shop fonts

- The Home sign has an Upload logo (or Change logo) button and a Font button. Uploading there sets the theme from the logo, as in Settings.
- Shop fonts: Bold, Poster, Elegant, Friendly, Handwritten, Modern, or each look's own. The choice letters the shop name across the app and print kit and the headings of every poster; Create can change it for one post. A wider font is set smaller so each look's layout holds.
- `PUT /api/shop/font`; shops gain `font`.

## 2026-10-21 (third round): rewards and platform icons

**Rewards**
- Settings has a Rewards section of its own: the membership reward (a stamp stepper and one-tap ideas), the comeback offer (with how many days before it goes out), and a new birthday treat.
- The birthday treat replaces the comeback offer in birthday messages, and shows on the join form, the member's card, the staff screen and the Members rules.
- `PUT /api/shop/rewards`; shops gain `bday`.

**Landing page**
- The green sign shows the icons of all 8 platforms under the four powers, on one row even on a phone.

## 2026-10-21 (second round): hype landing, shop details, logo theme, report months, print kit, Create presets

**Landing page**
- The sign now says "Superpower your shop." (给小店装上超能力。) with four short powers: AI posters in 60 seconds, AI captions for 8 apps, Membership system, Monthly report. The long paragraph is gone.
- Everything on the sign is centred, and the stamped photo hangs from its bottom edge instead of sitting off to one side. The four steps below use the same short words.

**Shop details and the logo theme**
- Settings has "Shop details": address, phone or WhatsApp, a Google Maps link and opening hours per day. Customers see open now, the hours, Directions, Call and WhatsApp at the foot of every customer screen.
- A new logo sets the brand colour from the logo itself, and the logo's other colours are offered as swatches. The owner app, customer page and staff screen take that colour.

**Report**
- The report opens on a list of every month since the shop joined. Generate one month, or the full report across all of them with a month-by-month chart and table.

**Print kit**
- The Share tab prints the customer QR as a table card, sticker sheet (12), name card sheet (10), A5 counter stand or A4 poster, with 8 designs, 5 headlines or your own, show and hide options, and English, 中文 or both.

**Create**
- 10 quick presets, and a Customize panel: badges in three styles and any corner, 12 colour swatches besides the brand and photo colours, and the logo on or off.

**API**
- `PUT /api/shop/details`, `GET /api/report/months`, `GET /api/report/month/<n>` (n months ago), `GET /api/report/all`. Shops gain `address`, `phone`, `maps` and `hours`.

## 2026-10-21 (overnight): better photos, the shop's brand, notices, members

Everything here runs on the phone or the app's own server. No paid services and no new dependencies.

**Better photos**
- Light and colour: Off, Natural or Bold. Levels from the photo's histogram, grey-world white balance, a lift for dark photos, vibrance and a light sharpen. Customer photos get Natural.
- Framing: drag the photo or use the arrow keys, and zoom up to 220%. Every size and look keeps what the owner chose.
- Create works like a studio: the big frame shows the chosen look as the finished poster and switches to the photo with a thirds grid while it is being dragged.

**The shop's brand**
- Settings has "Your brand": a logo (resized on the phone, checked by its bytes on the server), the real social handle, and a brand colour.
- Owner posters use the brand colour (a switch turns it off for one post) and carry the logo on a small white plate placed per look. Customer posts never show it.
- The logo also appears on the shop pill, the customer page and the table card. Home opens on the shop's own signboard in its colour.

**Notices and the menu board**
- Closed for a festival, new hours, a promotion, staff wanted, or the menu. Three designs (Signboard, Paper, Bold), English or 中文, sized for 7 places including a WhatsApp status, with a caption.
- Items in Settings take an optional price, and the menu board fills itself from them.

**Members**
- Tap a member to see every visit with its receipt and total, rewards and corrections. Corrections are +1 or −1 with a reason and are recorded.
- Search by name, code or phone.
- Counter staff can find a member who forgot their card by the phone number they joined with.
- An optional birth month when joining, "Birthdays this month" with a WhatsApp birthday message, and a birthday note on the staff screen.

**WhatsApp Status**
- Owner posts now include a 9:16 WhatsApp Status image, where many Malaysian shops really advertise. Home says "Posts for 7 apps".

**Month planner**
- "Plan my month" on Create: festivals and the week before them, payday, the 1st and Saturdays over the next 30 days, each with an idea and a look, as calendar reminders that link back to the app.
- The week planner's festive tile named Deepavali whatever the date; it now names the next festival.

**Fixes**
- The notice form ran 21 px past the screen on phones; its columns can now shrink.

**Print and report**
- An A4 counter poster on Share, in Chinese and English, to print or save for a print shop.
- The report reads like a printed monthly statement.
- "Busiest days": stamped visits by day of the week over this month and last, once there are 20 or more.

**API**
- `PUT /api/shop/brand`, `PUT` and `DELETE /api/shop/logo`, `GET /api/s/<slug>/logo`
- `GET /api/member/<code>/history`, `POST /api/member/<code>/adjust`, `GET /api/staff/<slug>/phone/<digits>`
- Join takes `birthMonth`, items take `price`, offers take `why`, and the members CSV has a `birth_month` column.

## 2026-10-21: free writing, professional posters, signboard landing page

**No paid AI**
- The Claude integration is gone: no SDK, no key, no server writing routes. The app is back to zero dependencies and costs nothing to run beyond hosting.

**Captions, smarter and still free**
- The writer runs on the phone. It reads what the item is from its name (17 kinds, from kopi and bubble tea to haircuts and flowers), notices iced drinks, uses the shop's own other items for "this or that?" and pairings, fits the moment and the look's voice, and picks emoji and hashtags to match. "Write another" goes through four shapes of caption.

**Posters, redesigned**
- All 22 looks were redrawn to one design system (`design/poster-philosophy.md`): a fixed margin, three type sizes at most, prices set as type instead of starbursts, a fine print grain, and colour taken from the photo's own strongest hue.
- New looks: Menu card (dot leaders between item and price), Risograph (two inks slightly out of register), Contact sheet (frames on a lightbox, the best one circled in grease pencil). They replace Comic, Stickers and Collage.
- The rest were rebuilt: Clean is a Swiss product card, Premium a low-light italic serif with a hairline frame, Fun a bright block with a hard offset shadow, Kopitiam an enamel signboard with penny tiles, Gallery a mounted print with a museum label, Duotone uses curated ink pairs, Neon writes the title in light, Festive has a gilded arch and a quiet lattice.
- New typefaces for posters: Fraunces, Caveat and Geist Mono.

**Landing page, redesigned**
- The hero is a shophouse signboard in kopitiam enamel green, with the headline in Chinese and English the way real signboards are, and the stamped photo hanging off its edge.
- Under it, a shop window of six real posters at each platform's true size deals out of the photo as the page opens.
- The pinned scroll story is replaced by four calm steps, each shown with the real thing. The closing call to action is a small matching signboard.

## 2026-10-20: more looks, table card designs, smarter captions

**Looks**
- 22 looks for owners and customers alike, up from 4 and 6. Twelve are new: Polaroid, Kopitiam, Chalkboard, Neon, Colour block, Gallery, Duotone, Comic, Batik, Collage, Ticket and Stickers. Owners also get the six customer frames, and customers get the four owner looks.
- Every look adapts to each platform's size, including Google's 4:3 and TikTok's 9:16.
- Festive follows the calendar (Deepavali, Christmas, Chinese New Year, Hari Raya, Merdeka, Malaysia Day, Mid-Autumn) with its own colours, motifs and greeting.
- A customer's post never shows a "NEW" sticker; only the owner knows what is new.
- Chinese titles never end on a lone character.
- The look picker on Create is a two-row strip. The customer swipe paints the card in view and its neighbours instead of all 22 at once.

**Table card**
- Eight designs: Classic, Red seal, Kopitiam, Night, Sunny, Minimal, Pandan and Festive. The choice is remembered on the phone and prints as shown.

**Captions**
- The built-in writer now fits the moment (morning, lunch, after work, late, weekend, Friday, Monday, payday, a festival coming up), writes in the look's voice, ends with an invitation and adds up to 5 hashtags. Lunch and tea-time openings only appear for food and drink shops.
- Optional AI writing with Claude when `ANTHROPIC_API_KEY` is set. Removed again on 2026-10-21.
- The week plan uses seven different looks.

## 2026-10-20: sponsor review

The sponsor asked for nicer colour, a simpler home page, a stronger sense of superpower and no filler labels, and liked the competitor's clean, content-first screens.

**Colour**
- A bright feed palette: white and light grey surfaces, ink type, one brighter chop red (`#E0201B`) and a sticker yellow for the pilot promise. The old cream background and the dark cards with red glows are gone.
- The seal logo, favicon and app icon use the new red.

**Landing page**
- The hero shows the product working: one photo lands, the seal stamps it, and it bursts into a feed of real posts for Xiaohongshu, Lemon8, TikTok, Google Reviews, WhatsApp Status, Instagram, Facebook and Threads, each in its own size and words.
- Removed: the "Now in pilot" and "Made in Malaysia" chips, the hero tagline, the "Power 1–4" labels, section labels above headings, the power-points card, the "Example" tag, the platform card grid and the scrolling "1 minute" band.
- The recommended plan is a red card, the pilot promise is yellow and the final call to action is red.

**Owner Home**
- One big red "Snap a photo" button. Picking a photo goes straight into Create.
- This month in three numbers: member spend, posts made and new members.
- The six-step checklist is now one "Next" row with a progress ring.
- Power points and levels are removed everywhere, including the level-up pop-up.

**Customer page (QR start screen)**
- White screen. Five post looks (magazine, receipt, Xiaohongshu cover, cute, film) open into a fan, painted with the shop's name and city. A camera mark in the shop type's colour stands where the customer's photo will go, so no stand-in photo is used.
- New line: "Your photo, ready for every app.", the eight platform marks, and the red photo button. On short phones the button stays at the bottom of the screen.
- The photo button can now be reached with the keyboard. Long shop names no longer push the EN/中文 switch onto two lines.

**Customer page (after the photo)**
- Every step after the photo is white too: the three taps, the style swipe, the posts, joining, the member card and the privacy notice. The shop type's colour is gone from the page; the colour now comes from the customer's photo and the looks.
- "Tell us in 3 taps" shows the photo they just took next to the heading.
- Picked answers turn ink, and red is kept for each step's main button.
- The join form now starts at the top of the screen.
- The phone's top bar is white on customer pages.

**Everywhere**
- Making a poster turns the whole screen into the red seal while it carves.
- Member cards are white paper stamp cards with red chops.

**Fixes**
- The claim check no longer flags "#10" as "#1". Words with letters or digits match whole words only.
- The Clean poster keeps a two-line title inside its band; short Chinese titles stay on one line.
- White text on red and on the WhatsApp tile passes contrast checks.
- The green "passed" tag on the content check is a little darker, so it passes contrast checks.

## 2026-10-20: pilot-ready

Everything a real shop needs before Go AI goes on its counter.

**For owners**
- Home has a "Get started" checklist, ticked off from real data: items added, staff PIN set, first QR scan, first poster, first member, Google review link. It disappears once everything is done.
- Members can be removed. "Download your data" exports members and visits as CSV, safe to open in a spreadsheet.
- Settings can change the password, which signs out other phones. Settings can also delete the shop and all its data, after typing the password.
- The table card prints on its own, about 10 cm wide, with "Join free for stamps" and the reward.
- The app can be added to a phone's home screen.

**For counter staff**
- A mistaken stamp can be undone for 10 minutes.

**For customers**
- From their member card, a customer can stop WhatsApp offers or leave and delete their card.
- Each shop has a plain-language privacy notice, linked from the join form and the card.
- Phones set to Chinese open in 中文.

**Landing page**
- An example shop for all 10 shop types, picked from a dropdown under "See it as your shop", with AI-generated example photos.
- Link previews (title, description, image) when the link is shared on WhatsApp or Facebook.

**Under the hood**
- A Content Security Policy on the app page, plus `nosniff`, referrer and permissions headers on everything, and HSTS when `SECURE=1`.
- `GET /api/health`.
- `npm run backup` copies the live database into `backups/`.
- `npm run admin -- shops | reset-password <email>`.
- A `Dockerfile`. It has not been built yet; there is no Docker on the dev PC.
- A wrong current password in Settings now says so, instead of "email or password".
- The phone only vibrates after the person has touched the page, which stops console errors.
- `npm test` covers undo, CSV export and formula defusing, leaving, opting out, removing a member, password change and account deletion.

## 2026-10-20: staff PIN

Counter devices unlock a shop's staff page with a PIN and can only find members, stamp and redeem.

## 2026-10-20: 10 shop types

Café, restaurant, bakery, drinks, salon, beauty, pet, florist, fashion and other. Each has its own customer chips, occasions, hashtags, colours and defaults in English and 中文.

## 2026-10-20: real app

The pitch demo became a working app: a Node and SQLite server, accounts, shop settings, real members, stamps, offers and reports. The demo itself is kept in `prototype/`.
