// A locally generated (no network fetch) placeholder avatar graphic, drawn in the
// site's sage/pastel palette. Encoded as an inline SVG data URI so it can be used
// anywhere an <img> or media `src` is expected, exactly like a real photo would be.
const PLACEHOLDER_AVATAR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Profile placeholder">
  <defs>
    <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eef2e6" />
      <stop offset="100%" stop-color="#c9d9bd" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#avatarBg)" />
  <circle cx="100" cy="80" r="38" fill="#9aaf88" />
  <path d="M38 194c3-48 33-78 62-78s59 30 62 78z" fill="#5e7759" />
</svg>
`.trim()

export const PLACEHOLDER_AVATAR_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(PLACEHOLDER_AVATAR_SVG)}`
