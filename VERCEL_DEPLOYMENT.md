# 🚀 Vercel Deployment Guide - NairaTax

Complete step-by-step guide to deploy NairaTax to Vercel.

## ⏱️ Time Required: 30 Minutes

- Setup: 10 minutes
- Deployment: 2 minutes  
- DNS Configuration: 24-48 hours (propagation)

---

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Git installed locally
- [ ] Node.js installed (to test locally first)
- [ ] Domain access (www.nairatax.ng DNS settings)

---

## 🎯 Step 1: Test Locally (5 minutes)

Before deploying, ensure everything works:

```bash
# Navigate to project directory
cd nairatax

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Edit .env.local
# NEXT_PUBLIC_GA_ID=G-YJZ8RB879V
# NEXT_PUBLIC_SITE_URL=https://www.nairatax.ng

# Run development server
npm run dev
```

Visit http://localhost:3000 and verify:
- [ ] Page loads without errors
- [ ] No TypeScript errors
- [ ] Tailwind CSS working

---

## 🔨 Step 2: Build for Production (2 minutes)

Test the production build:

```bash
# Build
npm run build

# Start production server
npm start
```

Visit http://localhost:3000 again.

**Verify:**
- [ ] No build errors
- [ ] Page loads correctly
- [ ] Console shows no errors

If errors appear, fix them before proceeding.

---

## 📦 Step 3: Push to GitHub (5 minutes)

### If you don't have a GitHub repo yet:

1. **Go to GitHub** and create a new repository:
   - Name: `nairatax`
   - Private: Yes (recommended)
   - Don't initialize with README (you already have files)

2. **Initialize Git locally:**

```bash
# In your nairatax directory
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit - NairaTax production ready"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nairatax.git

# Push to GitHub
git push -u origin main
```

### If you already have a GitHub repo:

```bash
git add .
git commit -m "Production ready"
git push origin main
```

**Verify:** Visit your GitHub repo and ensure all files are there.

---

## 🚀 Step 4: Deploy to Vercel (2 minutes)

### 4.1 Sign Up for Vercel

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### 4.2 Import Project

1. In Vercel dashboard, click **"Add New Project"**
2. Click **"Import"** next to your `nairatax` repository
3. Vercel auto-detects Next.js configuration ✅

### 4.3 Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (leave as is)

**Build Command:** `npm run build` (auto-filled)

**Output Directory:** `.next` (auto-filled)

**Install Command:** `npm install` (auto-filled)

### 4.4 Add Environment Variables

Click **"Environment Variables"** and add:

```
Name: NEXT_PUBLIC_GA_ID
Value: G-YJZ8RB879V
```

```
Name: NEXT_PUBLIC_SITE_URL  
Value: https://www.nairatax.ng
```

**Important:** Add these to **all environments** (Production, Preview, Development)

### 4.5 Deploy

Click **"Deploy"**

Vercel will:
1. Install dependencies (~30 seconds)
2. Build your application (~1 minute)
3. Deploy to CDN (~30 seconds)

**Total time: ~2 minutes**

### 4.6 Verify Deployment

Once complete, Vercel provides a URL like: `https://nairatax.vercel.app`

Click "Visit" and verify:
- [ ] Site loads correctly
- [ ] No console errors
- [ ] Google Analytics loads (F12 → Network → search "gtag")

---

## 🌐 Step 5: Add Custom Domain (5 minutes setup + 24-48 hours DNS)

### 5.1 Add Domain in Vercel

1. In your Vercel project dashboard, click **"Settings"**
2. Click **"Domains"**
3. Enter: `www.nairatax.ng`
4. Click **"Add"**

Vercel will show you DNS instructions.

### 5.2 Configure DNS at Your Domain Registrar

Go to where you bought `nairatax.ng` (Namecheap, GoDaddy, etc.)

**Add/Update DNS Record:**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

**Optional - Redirect root domain (nairatax.ng → www.nairatax.ng):**

Also add in Vercel Domains: `nairatax.ng`

Then add this DNS record:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

Vercel will auto-redirect `nairatax.ng` → `www.nairatax.ng`

### 5.3 Wait for DNS Propagation

**Typical time:** 1-6 hours  
**Maximum time:** 48 hours

**Check propagation:** https://www.whatsmydns.net

### 5.4 SSL Certificate

Vercel **automatically** provisions SSL certificate.

Once DNS propagates:
- Visit https://www.nairatax.ng
- Should see green padlock 🔒
- Certificate issued by Let's Encrypt

---

## ✅ Step 6: Verify Production (5 minutes)

Once DNS propagates, test thoroughly:

### Homepage
- [ ] Visit https://www.nairatax.ng
- [ ] Page loads correctly
- [ ] HTTPS working (green padlock)
- [ ] No console errors

### Google Analytics
- [ ] Press F12 → Network tab
- [ ] Reload page
- [ ] Search for "gtag"
- [ ] Should see requests to `googletagmanager.com`
- [ ] Check Google Analytics Real-Time reports

### SEO
- [ ] View page source (Ctrl+U)
- [ ] Verify meta tags present
- [ ] Visit https://www.nairatax.ng/sitemap.xml
- [ ] Should see sitemap with today's date

### Mobile
- [ ] Test on phone
- [ ] Responsive design working
- [ ] Touch interactions work

### Performance
- [ ] Visit https://pagespeed.web.dev
- [ ] Test www.nairatax.ng
- [ ] Target: 90+ desktop, 80+ mobile

---

## 📊 Step 7: Submit to Google Search Console (5 minutes)

### 7.1 Add Property

1. Go to https://search.google.com/search-console
2. Click **"Add Property"**
3. Enter: `https://www.nairatax.ng`

### 7.2 Verify Ownership

**Recommended method: HTML tag**

1. Google gives you a meta tag
2. Add it to `app/layout.tsx` in the `<head>`
3. Push to GitHub
4. Vercel auto-deploys
5. Click "Verify" in Google Search Console

**Alternative: DNS verification**
1. Google gives you a TXT record
2. Add to your DNS
3. Click "Verify"

### 7.3 Submit Sitemap

1. In Search Console → Sitemaps
2. Enter: `sitemap.xml`
3. Click "Submit"

Google will start indexing your pages.

---

## 🔄 Future Deployments (30 seconds each!)

After initial setup, updates are **automatic**:

```bash
# Make changes to your code

# Commit and push
git add .
git commit -m "Update tax calculations"
git push origin main

# Vercel automatically deploys (2-3 minutes)
# No manual steps needed!
```

---

## 🎯 Deployment Complete Checklist

- [ ] Local testing passed
- [ ] GitHub repository created
- [ ] Deployed to Vercel
- [ ] Environment variables added
- [ ] Test deployment working (vercel.app URL)
- [ ] Custom domain added
- [ ] DNS configured
- [ ] DNS propagated (24-48 hours)
- [ ] HTTPS working
- [ ] Google Analytics tracking
- [ ] Sitemap accessible
- [ ] Google Search Console verified
- [ ] Sitemap submitted

---

## 🆘 Troubleshooting

### Build Fails

**Error: TypeScript errors**
```bash
# Run locally to see errors
npm run build

# Fix errors, then push
```

**Error: Missing dependencies**
```bash
# Ensure package.json is correct
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Domain Not Working

**Still showing Vercel URL after 48 hours:**
- Check DNS settings at registrar
- Use https://www.whatsmydns.net to verify CNAME
- Contact domain registrar support

**HTTPS Not Working:**
- Wait 5-10 minutes after DNS propagates
- Vercel auto-provisions SSL
- Check Vercel dashboard → Domains for status

### Google Analytics Not Tracking

**No gtag requests:**
```bash
# Verify environment variable in Vercel
# Settings → Environment Variables
# Should see NEXT_PUBLIC_GA_ID

# Redeploy if needed
# Deployments → ... → Redeploy
```

**Data not in GA dashboard:**
- Wait 24-48 hours for data
- Check Real-Time reports (shows immediately)

---

## 📞 Support Resources

### Vercel Support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
- Email: Support available on all plans

### DNS Help
- Namecheap: https://www.namecheap.com/support/
- GoDaddy: https://www.godaddy.com/help
- Cloudflare: https://support.cloudflare.com

### Next.js Help
- Docs: https://nextjs.org/docs
- Discord: https://nextjs.org/discord

---

## 💡 Pro Tips

### Automatic Deployments
- Every push to `main` branch triggers deployment
- Create `dev` branch for testing
- Merge to `main` when ready to deploy

### Preview Deployments
- Every pull request gets a preview URL
- Test before merging to production

### Analytics
- Enable Vercel Analytics (free)
- Settings → Analytics → Enable
- Get real user metrics

### Speed Insights
- Vercel provides free speed insights
- See real Core Web Vitals data

---

## 🎉 Congratulations!

Your NairaTax site is now live at https://www.nairatax.ng!

**What You Achieved:**
✅ Professional Next.js deployment  
✅ Automatic deployments from GitHub  
✅ Custom domain with HTTPS  
✅ Google Analytics tracking  
✅ SEO optimization  
✅ Global CDN delivery  

**Time Saved:**
Every future update takes 30 seconds (git push) instead of 15 minutes (FTP upload).

---

## 📈 Next Steps

### Add Calculators
1. Create calculator components
2. Add calculator pages in `app/calculators/[type]/`
3. Test locally
4. Push to GitHub
5. Auto-deploys!

### Monitor Performance
- Check Vercel Analytics
- Review Google Analytics
- Monitor Search Console

### Optimize
- Add more content
- Improve page speed
- Build backlinks

---

**Happy Deploying! 🚀**
