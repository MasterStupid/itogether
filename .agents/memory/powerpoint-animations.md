---
name: PowerPoint animation delivery
description: Distinguish live slide motion from native animations in downloaded PowerPoint files.
---
Web slide CSS animations do not carry over to the ordinary PowerPoint export. If the user requests animations for their downloadable presentation, deliver a PPTX with native animation timelines, not only an animated web preview.

**Why:** The user downloaded the presentation and reported that the animations were missing after a web-only animation update.

**How to apply:** Export the current deck, add native entrance timelines to a separate output file, validate timeline shape references and preserved slide content, and deliver that animated file. A subsequent ordinary export from the slide viewer will be static again. Do not imply native PowerPoint playback was tested when only the package structure was validated.
