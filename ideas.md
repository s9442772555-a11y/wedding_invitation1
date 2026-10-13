# Velvet Vow — Design Direction

## Ground-truth reference
The supplied mobile screen recording is the visual and interaction reference. Match its rose-pink embossed envelope opening, centered gold seal, white/gold light burst, dreamy sunset invitation, floral curtain framing, high-contrast serif headings, clean sans-serif body copy, and long mobile-first vertical flow.

## Theme Name
Velvet Vow — a theatrical sunset invitation that opens like a keepsake letter.

## Luxury enhancement
The hero now leans into a royal, ultra-premium wedding invitation: a deep garnet and midnight-plum entry stage, champagne-gold frame, monogram crest, dimensional burgundy envelope, embossed gold trim, larger wax seal, and a formal “honour of your presence” voice. The opened hero uses a framed glass-like invitation panel with gold hairlines, a Veer–Zara crest, champagne typography, and the Taj Mahal Palace line to signal a grand destination celebration.

## Design movement
The page should feel like a slow reveal: stillness and anticipation at the envelope, then a luminous release into warmth, sky, florals, and celebration.

## Core principles
- Make the envelope entry the unmistakable primary moment.
- Keep the one-page scroll intimate and mobile-first.
- Use layered texture, editorial serif typography, and small ornamental details rather than dense UI chrome.
- Make interactions tactile: tap to open, scratch to reveal, slide through photos, and submit an RSVP.
- Use generous negative space so the invitation reads like a printed heirloom.
- The hero should feel rarer and more ceremonial than the supporting sections.

## Color philosophy
The hero uses deep garnet, midnight plum, and antique champagne gold for a royal, millionaire-wedding mood. Rose pink and blush remain the tactile base in supporting sections. Lavender, coral, and dusky navy create the sunset atmosphere. Charcoal ink keeps text legible on light panels; white type is reserved for deeper sunset overlays.

## Layout paradigm
Full-bleed vertical sections sized for a phone viewport, with ornamental side curtains and floral rails used as a recurring frame. The envelope is a centered object over a full-screen jewel-tone backdrop. Post-entry sections alternate between scenic full-bleed panels and translucent invitation cards.

## Signature elements
- Champagne-gold VV / heart-star monogram.
- Gold wax seal with hand-lettered feel and small heart imprint.
- Embossed damask-like paper and gold envelope edging.
- Draped curtain / floral frame at the sides.
- Tiny uppercase labels with wide tracking.
- Hairline gold borders and ornamental dividers.
- Rounded pill actions that feel like invitation seals, not generic buttons.

## Interaction philosophy
Every interaction should reward curiosity without blocking the scroll: opening the seal unlocks the invitation; scratching reveals the date; carousel controls are discreet; RSVP is simple and forgiving.

## Animation
Use CSS keyframes and requestAnimationFrame where possible: flap unfolds with a soft cubic-bezier, seal scales/fades, a centered glow blooms outward, and the content rises into view. Scroll reveals use Intersection Observer. Avoid excessive motion after the hero.

## Typography system
- Display: Cormorant Garamond / Georgia fallback, large, italic, high-contrast serif.
- Body: DM Sans / system sans fallback, compact uppercase labels and comfortable paragraph copy.
- Numbers: DM Mono / ui-monospace for the countdown.

## Brand essence and voice
Warm, cinematic, personal, and softly ceremonial. The luxury hero adds formal royal language without losing the intimate handwritten warmth.

## Wordmark / logo
A simple VV monogram folded into a heart / envelope motif, rendered in antique gold on a deep rose square. Use it as the favicon and small header mark.

## Signature brand color
#b43c5d — velvet rose.

## Planned asset placement
1. `public/assets/sunset-terrace.jpg`: full-bleed scenic background for the opened invitation and lower footer, generated as a mobile-friendly editorial scene without text.
2. `public/assets/velvet-vow-icon.png`: opaque square project icon with the VV heart-envelope mark.
3. CSS-generated envelope, seal, damask pattern, floral rails, and scratch-to-reveal layer to keep the entry interaction crisp and lightweight.

## Current requested copy
The envelope no longer shows the top utility labels or V/Z monogram. Visible couple copy uses “Veera weds Zara”. The countdown is presented as a persistent two-day countdown per browser session.

## Little Glimpses gallery
The gallery now uses four generated fictional couple photographs in a single luxury framed stage. It auto-advances every two seconds with opacity/scale crossfades, supports previous/next controls, pagination dots, and horizontal pointer swipes while preserving vertical page scrolling.
