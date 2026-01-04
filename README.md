# Onye Ozi — Local Errand & Delivery (Prototype)

This repository contains a small client-side web app prototype for Onye Ozi — a local errand and delivery marketplace.

What I added

- Multi-page client-side app with simple router (Home, Request Errand, Become a Runner, About, Dashboard).
- Assets: `img/logo.svg`, `img/hero.svg` and several SVG illustrations in the `img/` folder (request, runner, delivery, about, contact, faq, dashboard).
- Richer `index.html` structure and an improved `index.js` that mounts page templates and handles mock data.
- README with quick run instructions.

New pages and features added:

- Contact page (contact form, mock send)
- FAQ page (expandable Q&As)
- Privacy & basic print-friendly styles
- Mobile menu toggle and improved navigation
- Small local CSS file `src/output.css` to avoid missing stylesheet error when loading

Run locally

1. Open `index.html` in your browser. No build step required for the prototype.
2. For a better dev environment, serve with a static server (Node):

```powershell
# install http-server globally if you don't have it
npm install -g http-server; http-server -c-1 .
```

Notes

- This is a front-end prototype using Tailwind CDN. For production, extract Tailwind into a build pipeline and add backend endpoints.
- Next steps suggested: add real forms with server APIs, authentication, database, tests, and CI.

Recommended next steps (short term roadmap):

- Wire forms to a lightweight backend (Express + SQLite) to persist errands and runner applications.
- Add basic user accounts and phone verification for runners.
- Add image optimization and proper asset pipeline (webpack/Vite) and Tailwind JIT build.
- Add automated tests (Jest for logic, Playwright for UI flows) and CI on push.
