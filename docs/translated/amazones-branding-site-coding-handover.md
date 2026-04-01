[Design Review URL]
https://design.war.co.jp/amazones/branding/sub/list.html


[color]
- Text (Gray 1 - dark): #4f4f4f
- Green: #81d8d0
- Gray 2 (medium): #98a6b5
- Gray 3 (light): #eef1f3
- Gradient: #98e9e2 > #f0f3f5
- Red: #f53662
- Pink: #ec73b2
- Brown: #8c4239

- Map gray: #cdd6dd


[font]
- English 01: Outfit (Google Fonts) Regular / SemiBold
https://fonts.google.com/specimen/Outfit
Usage locations:

- English 02: Manrope (Google Fonts)
Number portions within banners
*Since it is used in very few places, it can be rendered as SVG or images.

- Japanese: Zen Kaku Gothic New (Google Fonts) Medium / Bold
https://fonts.google.com/specimen/Zen+Kaku+Gothic+New?query=Zen+Kaku+Gothic+New

- Japanese (speech bubbles): TA Koigokoro (Adobe Fonts)
*If managing this font is difficult, it can be rendered as SVG or images.


---------------------------------------

[Link]
- If a new-window icon is present, open in a blank tab
- Link destinations for each are noted as comments within the PDF (common parts are only on the top page)

- Header: The hamburger menu expansion image is placed in the hover layer (overlay) (see footer for each link destination)
- Where we could not determine the link destination, nothing has been entered.

[Hover Behavior]
- Arrow + text buttons/links: Move in the direction of the arrow tip (referencing the site below) + opacity: 0.7;
https://wellnessland.co.jp/
- Arrow-only round buttons: Move as a whole + opacity: 0.7;
*Scroll down moves downward, page-top button moves upward
*For other buttons and text hover states without specific instructions, use opacity: 0.7; (new-window buttons, etc.)

---------------------------------------

[FAQ Accordion Section]
Initially, on PC all items should be open; on mobile, only the first item should be open.
*On the FAQ page, the first item of each category should be in the open state.

---------------------------------------

[Posts]
For the news page, member testimonials, Zones Times, and store pages, registrations will be handled in-house, so please code them statically following the design layout for now.

---------------------------------------

[Store List (Detail) Page]
https://design.war.co.jp/amazones/branding/sub/storelist_detail.html

This page has overlapping content with other pages, so the following sections can be shared:
- Service / Dr.Amazones section: Shared with the top page (index.psd)
- Monthly plan through optional services within Price: Shared with 02_5. Price Guide (price.psd)
- Simulation section: Shared with 02_4. Free Trial / Tour Reservation (reservation.psd)


Sections with partial differences:
- Flow/Free Trial section: Flow from reservation to free trial/tour (reservation_flow.psd)
*Only the background color differs

- Voice section: Same structure as the top page, but the text and embedded content differ (each store's content will be inserted)

- Flow/Reservation section: 02_4. Free Trial / Tour Reservation (reservation.psd)
*Background color, person's speech bubble color, and Step01 presence/absence differ.

- Form/Reservation section through footer: 02_4. Free Trial / Tour Reservation (reservation.psd)
*The form section background color and embedded form differ

---------------------------------------

[03_1. Women's Exclusive 24-Hour Gym Page]
https://design.war.co.jp/amazones/branding/sub/about.html

There are overlapping sections with the top page (with minor differences).
- Attraction (Amazones' Appeal) section: Differences in the title section (+side subtext) and whether the bottom is stepped
- Plan (Abundant Plans) section: Title section (+side subtext)


---------------------------------------

[Other Notes]
- For h2, please use the title format with Japanese text above English text (like News on the top page)
- The footer content is up-to-date only on the top page; please align other pages with the top page
- PDFs may not be the latest data. PSDs are the latest
- OGP and various icons are placed in the favicon_ogp folder
- The Medical Diet page has been renamed to Dr.Amazones. The directory map may not have been updated
- The member testimonials detail page has been removed. The directory map may not have been updated
- The camouflage background banner section at the bottom of each page has different content and people per page (some pages don't have it). Some pages share the same banner in pairs
- The other-page links below the camouflage background banner also differ per page (some pages don't have them)

---------------------------------------

[SP Design - To Be Submitted Later]
01_4. Amazones Protein modal section images as well
03_1. Women's Exclusive 24-Hour Gym
03_2. Amazones Personal Training
03_3. Dr.Amazones
03_4. AI Posture Diagnosis & Improvement
*Please let us know if there are other pages needed.

------------------


[To Be Submitted Later]
- 01_4. Amazones Protein Page
  - Modal section images

- 02_3. Store List (List) Page
  - Icon types

- 02_3_2. Store List (Detail) / 02_4. Free Trial / Tour Reservation Page
  - Simulation section video

- 03_3. Dr.Amazones Page
  - QR code and salon input code at the end of the usage instructions

- 03_4. AI Posture Diagnosis & Improvement Page
  - Sample video for "AI Posture Diagnosis"
  - YouTube URL for "Zones Stretch"
  - YouTube URL for "Geta Training"

---------------------------------------

[Common Animations]
- Regarding animation timing, it is difficult to give detailed instructions at this point.
To avoid back-and-forth, please create one sample for review before proceeding, or build it so that timing values can be easily changed later, and hand over the details so we can adjust in-house.
- For areas without specific animation instructions, please add fade-in or similar effects at your discretion.


(1) Jumping person
We want an animation that looks like the person is jumping.
Reference (appears from bottom to top with slight bounce):
https://dubdesign.net/download/html-css/css-animetion/
- The reference has a lot of momentum coming from far below, but we want similar timing with approximately 40-50px of movement.
- Since we want to convey a jumping image, if making it slightly longer helps it look more like a jump, feel free to adjust the timing.
- The top two people should appear first, then the bottom two (we want it triggered by scroll position)

----------

(2) Three content items arranged in a staggered layout (e.g., service section on the top page)
Display sequentially from left to right
Like the VOICE section on the reference site:
Reference:
https://design.war.co.jp/jfd_engineering/coding/index.html
*Apply the same animation to matching elements on other pages as well.

----------

(3) Speech bubble + person
We want animation similar to the cow, shrimp, fish, and chicken with speech bubbles on the reference site (speech bubble appearance should also match):
Reference:
https://www.yaohiko.co.jp/isshoumochi/


----------

(4) Horizontal scrolling sections (Topics, Voice on the top page, etc.)
Initial position should be as shown in the PSD; when scrolled via buttons, content overflows to the left
- Left/right buttons scroll one slide at a time
- The right slider uses standard slide behavior
- Additionally, auto-scroll left every 20 seconds

----------

(5) Numeric value animation
Animation reference:
https://dive.design/

----------

(6) Store count numeric section + corresponding prefectures on the map
- Will be populated via API (to be handled in-house)

----------

(7) Gray band English text section
English text scrolls horizontally (Our Vision section):
https://www.sanwa-paint.jp/

----------

(8) Ribbon section animation
Animation reference:
https://tokyotechnology.jp/
*It doesn't need to be synchronized with scrolling, but if possible, we'd like it to gradually appear.

----------

If there are any missing instructions or questions, please don't hesitate to ask.
Thank you for your cooperation.
