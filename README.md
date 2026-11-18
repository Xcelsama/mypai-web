# mypai website

A one-page Next.js site for the mypai WhatsApp study bot, with a live chat demo that mimics the bot.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production check
```

## Make it yours (two minutes)

Open `lib/site.ts` and set:

- `downloadUrl`: where people download the bot zip (every "Download" button uses it)
- `sourceUrl`: your GitHub link, or leave it empty to hide the link
- `studentPackUrl`: the GitHub Student Developer Pack link (already set)

The offers table is in `app/page.tsx` (`perks`). It was researched on 18 Nov 2026. Student offers change often, so re-check the live pages and update `researchedOn` in `lib/site.ts` when you do.

The demo replies live in `components/ChatDemo.tsx` (`SCENES`). They are scripted, not a real bot, and the page says so.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New > Project**, import the repository, and press **Deploy**. Framework is detected as Next.js, and no settings are needed.

Netlify and Cloudflare Pages also work. The website is static-friendly, but the bot itself cannot run on any of these: it needs an always-on host.
