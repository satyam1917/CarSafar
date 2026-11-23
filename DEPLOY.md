# Deploy CarSafar to a public link

CarSafar is a static site: one `index.html` plus the `img/` folder. There is no build step, no backend and no API key, so any static host works. First, unzip the whole folder.

## Option A: Vercel with GitHub (recommended, permanent link)

1. Create a new **public** repository on github.com, e.g. `carsafar`.
2. On the repo page, click **Add file → Upload files**. Drag in **everything inside** the `carsafar-site` folder: `index.html`, `img/`, `vercel.json`, `src/` and the rest. Then click **Commit changes**.
   - `index.html` must sit at the top level of the repo, not inside another folder.
3. Go to **vercel.com** → sign in with GitHub → **Add New… → Project** → **Import** your `carsafar` repo.
4. Keep the settings as they are: Framework Preset **Other**, no build command, output directory blank (the repo root). Click **Deploy**.
5. After about 30 seconds you get a link like `https://carsafar.vercel.app`. Each new commit redeploys automatically.

## Option B: Vercel from the terminal

```bash
cd carsafar-site
npx vercel          # log in when asked, accept the defaults
npx vercel --prod   # gives the production link
```

## Option C: Netlify Drop (no account set-up, about 1 minute)

1. Open **app.netlify.com/drop**.
2. Drag the unzipped `carsafar-site` **folder** onto the page.
3. You get a live link at once. Sign up to keep it permanently and rename it, e.g. `carsafar.netlify.app`.

## Option D: GitHub Pages

Upload the files as in Option A, step 2. Then go to **Settings → Pages → Branch: main / (root) → Save**. The link is `https://<username>.github.io/carsafar/`.

## After deploying, check

- Home, New cars, a car page, colour swatches, Chat with dealer, Shortlist → Decision Score, and the Dealer partners link in the footer all work.
- Links within the app use `#` addresses (e.g. `/#car-creta`), so any page can be shared and reloaded on any host.
- Open the link in a private window to confirm it's public before sending it to Groww.

## Notes

- `.vercelignore` keeps the source files (`src/`) and the local start scripts out of the deployed site.
- Image file names are lower-case and must stay that way: hosts are case-sensitive.
- The font loads from Google Fonts; if it's blocked, the app falls back to the system font.
