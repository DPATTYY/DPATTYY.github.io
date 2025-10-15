# 🚀 GitHub Pages Deployment Guide

Complete guide to deploy your React + Three.js portfolio to GitHub Pages.

---

## 🎯 Problem Solved

**404 Error Fixed!** This guide addresses:
- ✅ Missing `index.html` in deployment
- ✅ Incorrect `base` path configuration
- ✅ Assets not loading (GLB models, CSS, JS)
- ✅ User site vs Project site configuration

---

## ⚙️ Configuration Applied

### 1. Vite Configuration ([vite.config.js](vite.config.js))

```js
export default defineConfig({
  plugins: [react()],
  base: '/', // For username.github.io (user/org site)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true, // Ensures public/models/avatar.glb is copied
  },
})
```

**Why?**
- `base: '/'` - Your site is `DPATTYY.github.io` (user site), not `DPATTYY.github.io/portfolio-react` (project site)
- `copyPublicDir: true` - Ensures your `.glb` model is included in build

### 2. Package.json Updates ([package.json](package.json))

Added:
```json
{
  "homepage": "https://dpattyy.github.io",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.3.0"
  }
}
```

---

## 🚀 Deployment Methods

### **Method 1: Automated via GitHub Actions (Recommended)**

#### Setup Steps:

1. **Enable GitHub Pages in Repository Settings:**
   - Go to: https://github.com/DPATTYY/DPATTYY.github.io/settings/pages
   - **Source**: GitHub Actions
   - Click **Save**

2. **Push Your Code:**
   ```bash
   cd /Users/Dharm/DPATTYY.github.io
   git add portfolio-react
   git commit -m "feat: add React portfolio with 3D avatar"
   git push origin main
   ```

3. **Workflow Runs Automatically:**
   - Watch progress: https://github.com/DPATTYY/DPATTYY.github.io/actions
   - Takes ~2-3 minutes
   - Your site will be live at: **https://dpattyy.github.io**

#### Workflow File Created:

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

This workflow:
- ✅ Builds on every push to `main`
- ✅ Installs dependencies
- ✅ Runs `npm run build`
- ✅ Deploys `dist/` folder to GitHub Pages
- ✅ Can be triggered manually

---

### **Method 2: Manual Deployment via gh-pages**

```bash
cd portfolio-react
npm run deploy
```

This will:
1. Build your project (`npm run build`)
2. Push the `dist/` folder to a `gh-pages` branch
3. GitHub Pages will serve from that branch

**Then configure GitHub Pages:**
- Go to Settings → Pages
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **root**
- Save

---

## 🧪 Test Build Locally

Before deploying, test the production build:

```bash
cd portfolio-react

# Build
npm run build

# Preview the build
npm run preview
```

Open the preview URL (usually `http://localhost:4173`) and verify:
- ✅ Avatar loads correctly
- ✅ All assets (CSS, JS) work
- ✅ No console errors
- ✅ Navigation works

---

## 📁 Build Output Structure

After running `npm run build`, your `dist/` folder should look like:

```
dist/
├── index.html              ← Required!
├── assets/
│   ├── index-abc123.js     ← Hashed JS
│   ├── index-def456.css    ← Hashed CSS
│   └── ...
└── models/
    └── avatar.glb          ← Your 3D model (1.3MB)
```

**Verify:**
```bash
ls -la portfolio-react/dist/
```

---

## 🔍 Troubleshooting

### Issue 1: 404 "File not found"

**Cause:** Wrong `base` configuration or missing `index.html`

**Fix:**
1. Check `vite.config.js` has `base: '/'`
2. Run `npm run build` and verify `dist/index.html` exists
3. Check GitHub Pages source is set to GitHub Actions or `gh-pages` branch

---

### Issue 2: Blank Page / White Screen

**Cause:** Assets loading from wrong path

**Fix:**
1. Open browser console (F12) → Console tab
2. Look for 404 errors on `.js` or `.css` files
3. If paths are wrong (e.g., `/portfolio-react/assets/...`), update `base` in `vite.config.js`

**For user site** (username.github.io):
```js
base: '/'
```

**For project site** (username.github.io/repo-name):
```js
base: '/repo-name/'
```

---

### Issue 3: Avatar Model Not Loading

**Cause:** Public assets not copied to build

**Check:**
```bash
ls -la portfolio-react/dist/models/avatar.glb
```

**If missing:**
1. Verify `public/models/avatar.glb` exists
2. Check `vite.config.js` has `copyPublicDir: true`
3. Rebuild: `npm run build`

---

### Issue 4: Build Fails

**Common errors:**

**Error:** "Cannot find module '@react-three/fiber'"
```bash
cd portfolio-react
npm install
```

**Error:** "Vite: Rollup failed to resolve import"
- Check all imports are correct
- Verify node_modules exists
- Try: `rm -rf node_modules package-lock.json && npm install`

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] `npm run build` completes without errors
- [ ] `dist/index.html` exists
- [ ] `dist/models/avatar.glb` exists (1.3MB)
- [ ] `npm run preview` shows working site
- [ ] GitHub Pages source is configured
- [ ] No console errors in preview
- [ ] Avatar loads and animates

---

## 🎨 Your Deployment URLs

### Development
- **Local dev**: http://localhost:5174/
- **Build preview**: http://localhost:4173/

### Production
- **Live site**: https://dpattyy.github.io
- **GitHub Actions**: https://github.com/DPATTYY/DPATTYY.github.io/actions
- **Settings**: https://github.com/DPATTYY/DPATTYY.github.io/settings/pages

---

## 🔄 Update Workflow

After making changes:

```bash
cd /Users/Dharm/DPATTYY.github.io

# 1. Test locally
cd portfolio-react
npm run dev

# 2. Build and preview
npm run build
npm run preview

# 3. Commit and push (triggers auto-deploy)
cd ..
git add portfolio-react
git commit -m "update: improved avatar animation"
git push origin main

# 4. Watch deployment
# Visit: https://github.com/DPATTYY/DPATTYY.github.io/actions
```

Site updates in ~2-3 minutes! 🎉

---

## 🛠️ Manual Deployment Script

If GitHub Actions isn't working, use this:

```bash
#!/bin/bash
cd portfolio-react

echo "🔨 Building..."
npm run build

echo "📦 Deploying to gh-pages branch..."
npm run deploy

echo "✅ Deployed! Visit: https://dpattyy.github.io"
echo "⏱️  Allow 1-2 minutes for GitHub Pages to update"
```

Save as `deploy.sh`, make executable: `chmod +x deploy.sh`, run: `./deploy.sh`

---

## 🎯 Expected Result

After successful deployment:

1. Visit: **https://dpattyy.github.io**
2. You should see:
   - ✅ Your portfolio hero section
   - ✅ 3D avatar floating and following mouse
   - ✅ All sections (About, Projects, Experience, Contact)
   - ✅ Smooth animations
   - ✅ No 404 errors

---

## 📊 Deployment Status

Check deployment status:

```bash
# Check if gh-pages branch exists
git branch -a | grep gh-pages

# View GitHub Actions logs
# Visit: https://github.com/DPATTYY/DPATTYY.github.io/actions

# Check current deployment
# Visit: https://github.com/DPATTYY/DPATTYY.github.io/deployments
```

---

## 🔗 Useful Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to gh-pages branch
npm run deploy

# Check build size
du -sh portfolio-react/dist

# List all files in build
ls -laR portfolio-react/dist
```

---

## 🎓 Key Differences: User Site vs Project Site

### User Site (`username.github.io`)
- **URL**: https://dpattyy.github.io
- **Base**: `base: '/'`
- **Branch**: `main` or `gh-pages`
- **Your case**: ✅ This one!

### Project Site (`username.github.io/repo-name`)
- **URL**: https://dpattyy.github.io/portfolio-react
- **Base**: `base: '/portfolio-react/'`
- **Branch**: `gh-pages`
- **Not applicable** for your setup

---

## ✅ Configuration Summary

| Setting | Value | File |
|---------|-------|------|
| **Base URL** | `/` | `vite.config.js` |
| **Homepage** | `https://dpattyy.github.io` | `package.json` |
| **Build Output** | `dist/` | `vite.config.js` |
| **Deploy Source** | GitHub Actions | `.github/workflows/deploy.yml` |
| **Assets Dir** | `assets/` | `vite.config.js` |
| **Copy Public** | `true` | `vite.config.js` |

---

## 🆘 Still Having Issues?

1. **Check Build Logs:**
   - https://github.com/DPATTYY/DPATTYY.github.io/actions

2. **Verify GitHub Pages Settings:**
   - https://github.com/DPATTYY/DPATTYY.github.io/settings/pages
   - Should say: "Your site is live at https://dpattyy.github.io"

3. **Check Browser Console:**
   - Visit your deployed site
   - Press F12 → Console tab
   - Look for 404 or CORS errors

4. **Test Build Locally:**
   ```bash
   cd portfolio-react
   npm run build && npm run preview
   ```

---

## 🎉 Success!

Once deployed, your portfolio will be live at:

### **https://dpattyy.github.io**

Features:
- ⚡ Fast loading
- 🎨 Professional 3D avatar
- 📱 Mobile responsive
- 🌐 SSL enabled (HTTPS)
- 🚀 Global CDN delivery

---

**Built with:**
- React + Vite
- React Three Fiber + Drei
- GitHub Pages
- GitHub Actions

**Last Updated:** October 15, 2025
