# Launch to Wealth Website

Five pages, sharing `css/style.css` and `js/script.js`:
- `index.html` — Home
- `episodes.html` — Top Episodes (5 embedded YouTube videos)
- `paidtuber.html` — The PaidTuber Challenge (full sales page)
- `resources.html` — Free Resources (3 downloadable lead magnets)
- `contact.html` — Contact form

## To preview
Open `index.html` in a browser. All links between pages already work.

**Important — about video playback:** if you're testing by double-clicking the HTML file (so the address bar shows `file:///Users/...`), YouTube embeds may not play. This is a browser security restriction (especially in Safari) on local files, not a bug in the code — the same embeds work normally once the site is on a real server or hosted live. Every embedded video also has a permanent "Prefer YouTube? Watch there instead ↗" link underneath it that always works regardless, opening the real video on youtube.com.

## Adding your images
Drop your files into the `images/` folder using these exact names — placeholders disappear automatically once a real file with that name is present. Every photo (except the founder portrait) gets a soft brand-color tint automatically so real photos harmonize with the palette instead of clashing — nothing you need to do for that.

**Brand**
- `images/logo.png`

**Home page**
- **Hero visual**: the single hero photo is now a grid of 6 real, open-source photos of diverse women (sourced from Unsplash, free to use under the Unsplash License — no attribution legally required, though it's always appreciated). These are hotlinked directly from Unsplash's CDN, so there's no local file to drop in. If you'd rather use your own photos, open `index.html`, find `.hero-face-grid`, and swap any `<img src="https://images.unsplash.com/...">` for your own image path.
- `images/watch-clip.mp4` — the looping talking-head clip in the Watch section (autoplay, muted, loops). `images/watch-clip-poster.jpg` is the still frame shown before it loads.
- `images/book.png` — cover for *Richer On Purpose*, shown in the book pre-order section
- `images/face-doctor.jpg`, `images/face-lawyer.jpg`, `images/face-teacher.jpg`, `images/face-nurse.jpg`, `images/face-consultant.jpg`, `images/face-engineer.jpg` — the 6-photo face grid
- `images/pt-plaque.jpg` — photo of Vanessa holding the YouTube plaque, shown on The PaidTuber Challenge card
- `images/vanessa-founder.jpg` — About Vanessa portrait (the one photo that does *not* get the color tint, since it should read as a true likeness)
- `images/store-vision-deck.jpg`, `images/store-idea-to-income-journal.jpg` — Store product shots
- `images/press-insider.png`, `images/press-essence.png`, `images/press-fincon.png`, `images/press-newschool.png`, `images/press-skillshare.png`, `images/press-publishersweekly.png` — press logos (shown greyed out, full color on hover). Transparent PNGs work best. These same six files are reused on the PaidTuber page.

**PaidTuber page**
- `images/pt-first-paycheck.jpg` — screenshot of the first YouTube AdSense paycheck
- `images/pt-smiling.jpg` — smiling photo of Vanessa
- `images/pt-business-insider-feature.jpg` — screenshot of the Business Insider article

## The real channel
Every "Subscribe," "Watch on YouTube," and footer YouTube link now points to `https://www.youtube.com/@LaunchToWealth`, opening in a new tab.

## Videos
The 5 links you sent are embedded on the Episodes page:
`Fhe0advzlzo`, `KmYvW-qdSBM`, `Nw1d0qlTpew`, `XOf1k5ijBuo`, `vWD5gC51ePg`

Videos are lazy-loaded — a clickable thumbnail shows until someone presses play, so the page stays fast.

## What's new in this round
- **Wealth Creator School** replaces "Launch to Wealth Academy": 3 tracks (Financial Assets, Physical Assets, Knowledge Assets) with Vanessa's copy, on the home page and on its own page, `wealth-creator-school.html` (linked from the nav "Learn" and the footer). Every "Learn more" opens a pop-up — "Get the Wealth Creator Blueprint straight to your inbox" — with first name, last name, email. The pop-up is front-end only for now: it needs your email service (Mailchimp/ConvertKit/etc.) to actually collect addresses. It also records which course the person clicked from.
- New hero header: "Build wealth beyond a 9-5 income by owning assets".
- Hero photo grid is now 9 women (4 Black women), Unsplash, free to use.
- **Needs Vanessa:** the real estate line was cut off mid-sentence ("...global real estate markets with limited"). Right now it reads "Learn how to access global real estate markets". Search `NOTE: Vanessa's message` in the HTML (two places) to replace it.
- The old Brand Deal Bootcamp / Side Hustle School cards are gone from the home page; the PaidTuber Challenge page still exists and is linked from the footer.
- Hero now opens with a grid of 6 real, diverse women (Unsplash, free to use) instead of one single photo — matching the "open with people like this" reference. On desktop it sits in its usual right-hand column beside the headline; on mobile it moves above the headline, full-width, same as it already did for the single photo.
- **Fixed:** the "As Featured In" logos only showed Essence because the code was looking for filenames (`press-business-insider.png`, etc.) that didn't match what was actually in your `images/` folder. Now pointing at your real files — `press-insider.png`, `press-essence.png`, `press-fincon.png`, `press-newschool.png`, `press-skillshare.png`, `press-publishersweekly.png` — all 6 show now.
- **Fixed:** the photo tint was there in the code but far too subtle to actually see (16% opacity). Strengthened it significantly plus added a slight desaturation, so career photos now visibly harmonize with the palette instead of clashing.
- **Fixed:** "Launch to Wealth" wordmark (nav, footer, and the curtain intro) now uses the same italic Fraunces serif as "Richer On Purpose" — Great Vibes is gone.
- Real YouTube channel wired in everywhere, plus a fallback link on every embed
- Watch section rebuilt: copy on the left, your own looping clip on the right (was a YouTube embed before — now it's a native video, ready for the file you send)
- Hero headline is now fully bold, per your notes
- New "Pre-order her book" section right after the marquee (early trust signal, ahead of the pitch), plus a lighter mention in the About Vanessa section
- Every underline accent is now a straight line, not wavy
- The opening intro is now a rocket launch — idle, ignition, liftoff past the top of the screen, background fades to reveal the site — instead of the old quick panel-slide. Runs about 3 seconds.
- Two new pages: **Free Resources** (the 3 lead magnets from your doc) and **Contact** (a working form UI, not yet wired to an inbox)
- Nav and footer updated across all 5 pages to include Resources and Contact

## What's still open (not enough content to build yet)
- **Brand Deal Bootcamp** and **Side Hustle School** still link to "Details Coming Soon" — no dedicated page copy exists yet for either.
- **Quiz** ("do you have a job?") and **webinar funnel** — mentioned in your notes but never specified (questions, logic, destination), so nothing was invented here. Say the word once you have the actual content.
- **New Wealth Club** (the membership) — only a name exists in your notes so far, no pricing or feature details, so it isn't built as a full page. Send content and it can become one.
- Email capture and contact forms are fully styled and functional on the front end (they show a confirmation state on submit) but aren't wired to a real email service yet — needs your Mailchimp/ConvertKit/Formspree details to actually collect submissions.
- Result numbers on the PaidTuber page (100K subscribers, 6-figure AdSense, etc.) were pulled directly from your doc — swap in current figures if they've changed.

## The animation
A one-time rocket-launch curtain plays on first visit each session (skips itself if the visitor has reduced-motion turned on, and won't replay on every page navigation — only once per browser session). Beyond that: a thin scroll-progress bar at the top, numbers that count up when they scroll into view, a staggered hero entrance, drifting money emoji confined to each section's own background, and a subtle magnetic pull on the primary buttons on desktop.
