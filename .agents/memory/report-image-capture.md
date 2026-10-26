---
name: Report/post image capture
description: How to produce sharp standalone PNG/JPG images of HTML compositions in this workspace (shirt report and post images)
---
- Screenshot tool output is JPEG (~quality 80) and capped at 3000 px per edge; it is not "sharp" enough when the user asks for a crisper format.
  **Why:** the user asked "chuyển sang định dạng nét hơn" after receiving a JPEG post image.
  **How to apply:** render the HTML with CSS `zoom: 2` on the page wrapper plus x/y offsets from query params, capture 3000-px tiles via the app preview, and stitch them with ImageMagick (`magick` is available; Pillow is not) into a PNG. Check a seam crop before delivering.
- Direct headless Chromium capture hung earlier; serving the HTML temporarily from the presentation artifact's public/assets folder and using the app-preview screenshot works reliably. Remove the temporary HTML afterwards.
