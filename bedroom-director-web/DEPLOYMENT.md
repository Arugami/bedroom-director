# Cloudflare Pages Deployment Guide

## Prerequisites
- GitHub repository with the code
- Cloudflare account

## Deployment Steps

### 1. Connect GitHub Repository to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select the repository: `bedroom-director`

### 2. Configure Build Settings

Use these settings in the Cloudflare Pages configuration:

- **Production branch**: `main`
- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: 
  ```bash
  cd bedroom-director-web && npm install && npm run build
  ```
- **Build output directory**: 
  ```
  bedroom-director-web/out
  ```
- **Root directory**: `/` (leave empty)
- **Environment variables**: None required for static site

### 3. Advanced Build Configuration

#### Node Version
The `.node-version` file specifies Node.js 20.11.0.
Cloudflare Pages will automatically use this version.

#### Build Caching
Cloudflare Pages automatically caches `node_modules` between builds.

### 4. Custom Domain Setup (Optional)

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `bedroomdirector.com`)
4. Follow DNS configuration instructions
5. Cloudflare will automatically provision SSL certificate

### 5. Preview Deployments

Every push to a non-production branch will create a preview deployment:
- URL format: `https://<BRANCH>.<PROJECT>.pages.dev`
- Useful for testing before merging to main

### 6. Deployment URL

After setup, your site will be available at:
- Production: `https://bedroom-director.pages.dev`
- Custom domain: `https://bedroomdirector.com` (after DNS setup)

## Local Testing

Test the production build locally before deploying:

```bash
cd bedroom-director-web
npm run build
npx serve out
```

## Continuous Deployment

Cloudflare Pages automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches
- **Pull Requests**: Preview deployment for each PR

## Performance Features

Cloudflare Pages provides:
- ✅ Global CDN with 200+ data centers
- ✅ Automatic HTTPS
- ✅ HTTP/2 and HTTP/3 support
- ✅ Brotli compression
- ✅ Smart caching via `_headers` file
- ✅ Instant cache purging on new deploys

## Monitoring

Monitor your deployment:
1. Check build logs in Cloudflare Pages dashboard
2. View deployment history
3. Monitor analytics (after domain is configured)
4. Set up alerts for failed deployments

## Troubleshooting

### ❌ Error: "Error occurred prerendering page /tools"

If you see this error during Cloudflare build:

**CAUSE:** Cloudflare is building from an old commit or incorrect settings.

**SOLUTION:**
1. **Verify latest commit:** Make sure Cloudflare is deploying commit `967d8e4` or later
   - In Cloudflare Pages dashboard, check the commit hash being deployed
   - Should show: "Complete Phase 14: Production-ready deployment"

2. **Check build settings are EXACT:**
   - Root directory: **Leave blank** (or set to `/`)
   - Build command: `cd bedroom-director-web && npm install && npm run build`
   - Build output: `bedroom-director-web/out`
   - **DO NOT** set root directory to `bedroom-director-web`

3. **Retry deployment:**
   - Click "Retry deployment" button in Cloudflare dashboard
   - Or push a new commit to trigger fresh build

4. **If still failing:** Check that these files exist in the repo:
   - `bedroom-director-web/src/app/tools/page.tsx` has Suspense wrapper
   - `bedroom-director-web/src/app/robots.ts` has `export const dynamic = 'force-static'`
   - `bedroom-director-web/src/app/sitemap.ts` has `export const dynamic = 'force-static'`

### Build Fails
- Check build logs in Cloudflare Pages dashboard
- Verify package.json dependencies
- Ensure Node version matches `.node-version`
- Make sure you're deploying from `main` branch with latest code

### CSV Not Loading
- Verify `ai_video_image_models.csv` is in `public/` folder (142 lines, 141 tools)
- Check file path in `src/lib/data/tools.ts`
- Should load 141 tools successfully

### Images Not Showing
- Ensure images are in `public/` folder
- Check `next.config.ts` has `unoptimized: true`

## Cost

Cloudflare Pages is free for:
- Unlimited static requests
- Unlimited bandwidth
- 1 build at a time
- 500 builds per month

Perfect for this project!
