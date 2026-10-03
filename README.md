# A Little Encouragement

A static church QR surprise. No dependencies, backend, forms, analytics, cookies, browser storage, or external assets. Hosting providers may keep normal infrastructure access logs; the application collects no visitor information.

## Run locally

From this folder run `python -m http.server 4173 --directory dist`, then open http://localhost:4173. Any static HTTP server works. There is no build step.

## Edit content

Edit `dist/quotes.js`. Each entry has `text` and an optional `reference`. Bible excerpts use the public-domain KJV, with references and translation labels. Keep at least two entries for the random button. The first quote is random and consecutive quotes never repeat.

Edit the opening heading and reveal wording in `dist/index.html`. The reveal delay is 800 milliseconds in `dist/app.js`. Colors and responsive layout live in `dist/styles.css`.

## Deploy

This project is registered with ChatGPT Sites via `.openai/hosting.json`; publish this same Site when making changes. Its static output is the tracked `dist` directory. Alternatively upload only `dist` to a static host such as Netlify, Vercel, or Cloudflare Pages. No install or build command is required. Update `og:url` if moving to another domain.

Keep the stable production URL when updating the site so printed QR codes continue to work. Regenerate the QR and sign only when the production URL changes. Never print a code for localhost or a temporary preview.

## Accessibility and privacy

Semantic HTML, a keyboard accessible button, polite quote announcements, visible focus, and reduced-motion support. All page assets load from the same origin. No network calls are made by application JavaScript. The page remains encouraging without JavaScript.
