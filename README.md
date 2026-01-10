# NairaTax - Nigerian Tax Calculator 2025

Production-ready Next.js application for calculating taxes under Nigeria's 2025 Tax Act.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and add your Google Analytics ID
# NEXT_PUBLIC_GA_ID=G-YJZ8RB879V
# NEXT_PUBLIC_SITE_URL=https://www.nairatax.ng

# Run development server
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
nairatax/
├── app/
│   ├── layout.tsx          # Root layout with GA
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Dynamic sitemap
│   └── globals.css         # Tailwind CSS
├── components/
│   ├── GoogleAnalytics.tsx        # GA tracking
│   └── CalculatorErrorBoundary.tsx # Error handling
├── public/
│   └── robots.txt          # Search engine directives
├── .env.example            # Environment template
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_GA_ID=G-YJZ8RB879V
NEXT_PUBLIC_SITE_URL=https://www.nairatax.ng
```

### Next.js Configuration

The `next.config.js` is optimized for:
- Vercel deployment (`output: 'standalone'`)
- Image optimization with Sharp
- Security headers
- Production optimizations

## 🎯 Features

### Implemented
- ✅ Dynamic sitemap (auto-updates dates)
- ✅ Google Analytics with App Router support
- ✅ Error boundaries for calculator safety
- ✅ Environment-based configuration
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ SEO optimization
- ✅ Image optimization with Sharp

### To Add
- [ ] 7 calculator components (Employee, Freelancer, Business, etc.)
- [ ] Calculator pages in `app/calculators/[type]/page.tsx`
- [ ] Form validation with React Hook Form + Zod
- [ ] Data visualization with Recharts

## 📊 SEO Features

### Dynamic Sitemap
Located at `/sitemap.xml`, automatically generated with current dates.

### Meta Tags
All pages include proper:
- Title tags
- Meta descriptions
- Open Graph tags
- Canonical URLs

### Robots.txt
Located in `/public/robots.txt`

## 🧪 Testing

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit

# Build production
npm run build

# Test production build locally
npm start
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nairatax.git
git push -u origin main
```

2. **Deploy to Vercel**
- Go to https://vercel.com
- Click "Import Project"
- Select your repository
- Vercel auto-detects Next.js settings
- Add environment variables:
  - `NEXT_PUBLIC_GA_ID=G-YJZ8RB879V`
  - `NEXT_PUBLIC_SITE_URL=https://www.nairatax.ng`
- Click "Deploy"

3. **Add Custom Domain**
- In Vercel dashboard → Domains
- Add `www.nairatax.ng`
- Update DNS at your registrar:
  ```
  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```

**Deployment Time:** ~2 minutes  
**Cost:** Free

### Option 2: Netlify

1. **Build Command:** `npm run build`
2. **Publish Directory:** `.next`
3. Add environment variables in Netlify dashboard
4. Connect custom domain

### Option 3: Static Export to SiteGround

**Important:** SiteGround doesn't support Node.js natively.

1. **Update next.config.js:**
```javascript
output: 'export',
images: { unoptimized: true },
```

2. **Build:**
```bash
npm run build
```

3. **Upload:** Upload contents of `out/` folder to SiteGround via FTP

## 🔄 Update Workflow

### For Vercel/Netlify (Auto-Deploy)
```bash
# Make changes
git add .
git commit -m "Update tax calculations"
git push origin main
# Automatically deploys in 2-3 minutes
```

### For SiteGround (Manual)
```bash
npm run build
# Upload out/ folder via FTP
```

## 📈 Performance

### Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Optimizations
- Image optimization with Sharp
- Code splitting
- Lazy loading
- Minification
- Compression (gzip/brotli)

## 🔒 Security

### Implemented
- HTTPS enforcement
- Security headers (X-Frame-Options, X-Content-Type-Options)
- No `X-Powered-By` header
- Environment variable protection

## 📊 Analytics

Google Analytics is integrated with:
- Page view tracking
- App Router navigation tracking
- Custom event tracking (ready to add)

## 🐛 Error Handling

### Error Boundaries
All calculator components are wrapped in `CalculatorErrorBoundary` to prevent full page crashes.

### Error UI
Displays user-friendly error messages with:
- Clear error description
- Refresh button
- Back to home link

## 🔍 Monitoring

### Recommended Tools
- **Vercel Analytics** - Built-in performance monitoring (free on Vercel)
- **Google Analytics** - User behavior tracking (already integrated)
- **Sentry** - Error tracking (optional, add if needed)

## 📝 Code Quality

### TypeScript
Full TypeScript support with strict mode enabled.

### Linting
ESLint configured for Next.js best practices.

### Formatting
Use Prettier (optional):
```bash
npm install --save-dev prettier
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For deployment issues:
- **Vercel:** https://vercel.com/support
- **Netlify:** https://answers.netlify.com
- **SiteGround:** 24/7 live chat

## ✅ Pre-Launch Checklist

Before going live:

### Content
- [ ] Add all 7 calculator components
- [ ] Test all tax calculations
- [ ] Add FAQ sections
- [ ] Verify all links work

### Technical
- [ ] Test on mobile devices
- [ ] Verify Google Analytics tracking
- [ ] Test error boundaries
- [ ] Check page load speeds
- [ ] Verify all images optimized

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for all pages
- [ ] Verify meta tags on all pages
- [ ] Check robots.txt

### Legal
- [ ] Add privacy policy
- [ ] Add terms of service
- [ ] Add disclaimer about tax calculations

## 🎯 Post-Launch Tasks

### Week 1
- [ ] Monitor Google Analytics
- [ ] Check Search Console for indexing
- [ ] Monitor error logs
- [ ] Gather user feedback

### Month 1
- [ ] Review search rankings
- [ ] Analyze user behavior
- [ ] Optimize based on data
- [ ] Plan content updates

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Built with ❤️ for Nigerian taxpayers**
