# Roadmap

Written 21 Oct 2026 for the overnight build. Each item says what the owner gets, then how it is built. Everything stays free: no paid services, no new dependencies, and photos never leave the phone.

**Status, morning of 21 Oct:** sections 1 to 5 are built and checked (server tests, the page self-test, axe on every changed screen, 中文, phone width). The A4 poster has not been tried on a real printer. Members kept its original header; only Home got the signboard.

**Added after the plan:** "Plan my month" (from Later), WhatsApp Status as a seventh owner platform, staff finding a member by phone, and a "Busiest days" chart in the report. Screens: `design/overnight-2026-10-21.jpg`.

## 1. Better photos before the poster

**1.1 Fix the light.** One tap evens out the light and colour of a phone photo and sharpens it a little, with Off, Natural and Bold settings. The before/after slider shows the real difference.
Built on the phone with canvas pixels: auto levels, grey-world white balance, vibrance and a light unsharp mask.

**1.2 Focus and zoom.** The owner drags to choose what stays in frame and zooms in a little. Every poster size uses that focus, from 9:16 TikTok to 4:3 Google.
One focus point and zoom go to the shared `photo()` helper, so all 22 looks follow it.

## 2. The shop's own brand on every poster

**2.1 Brand kit in Settings.** The owner adds a logo (resized on the phone), the shop's real Instagram or Xiaohongshu handle, and a brand colour.
**2.2 Posters use it.** Looks show the logo mark and the real handle. "Use my brand colour" replaces the colours taken from the photo.
The logo is stored on the server as a small image, at most 200 KB.

## 3. New things to make

**3.1 Notices.** Closed for a festival, new opening hours, a promotion, a new item or staff wanted. The owner fills in a few fields and gets posters for every platform, a WhatsApp status and a caption.
**3.2 Menu board.** Items get optional prices in Settings, and the owner gets the whole menu as one poster in a few looks.

## 4. Members

**4.1 Member page.** Visits with receipt and amount, a stamp correction (+1 or −1 with a reason, recorded) and a WhatsApp button.
**4.2 Birthdays.** An optional birth month when joining, a "Birthdays this month" list and a WhatsApp birthday offer.
**4.3 Search** the member list by name, code or phone.

## 5. Design

**5.1 Owner app in the Kedai Modern style.** Create becomes a studio with a big poster, Home and Members get the same signboard details as the landing page, and Report reads like a printed monthly statement.
**5.2 Print kit.** An A4 counter poster ("Scan, post, collect stamps") to go with the table card, ready to print.

## 6. Checks and notes

Server tests, the page self-test, accessibility, 中文 and phone checks after every step. Then README, CHANGELOG and this file are updated with what got done.

## Later

- Bahasa Melayu as a third language, for Malay-owned shops and customers.
- ~~A month planner: festivals, paydays and weekends with one-tap posts.~~ Built 21 Oct as "Plan my month" on Create.
- Chrome's built-in on-device AI for laptops that have it (free, but most phones can't run it).
