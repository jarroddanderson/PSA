# Purple Spider Agency — Production Calculator

## Quick Deploy to Vercel (Free)

### Step 1: Create a GitHub repo
1. Go to github.com → New Repository
2. Name it `ps-production-calc` (or whatever you want)
3. Upload all the files from this folder

### Step 2: Deploy on Vercel
1. Go to vercel.com and sign up with your GitHub account
2. Click "Import Project" → select your repo
3. Framework: Vite (it auto-detects)
4. Click Deploy — done in ~60 seconds
5. You'll get a URL like `ps-production-calc.vercel.app`

### Step 3: Embed in Squarespace
1. In Squarespace, go to the page where you want the calculator
2. Add a **Code Block** (under "Basic" blocks)
3. Paste this code (replace YOUR-URL with your Vercel URL):

```html
<div style="width:100%;max-width:1200px;margin:0 auto;">
  <iframe 
    src="https://YOUR-URL.vercel.app" 
    style="width:100%;height:100vh;min-height:800px;border:none;border-radius:16px;overflow:hidden;"
    loading="lazy"
    allow="clipboard-write"
    title="Production Calculator">
  </iframe>
</div>
```

4. Toggle "Display Source" off
5. Save and publish

### Optional: Custom domain
In Vercel dashboard → Settings → Domains, you can add something like:
- `calc.purplespideragency.com`

Then use that URL in the Squarespace embed instead.

---

## File Structure
```
├── index.html          ← Entry point
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
├── tailwind.config.js  ← Tailwind setup
├── postcss.config.js   ← PostCSS setup
└── src/
    ├── main.jsx        ← React mount
    ├── index.css       ← Tailwind imports
    └── App.jsx         ← The entire calculator app
```
