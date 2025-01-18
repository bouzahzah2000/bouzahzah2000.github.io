# Deployment Guide for EnglishMaster

## Prerequisites

1. Install Node.js and npm:
   - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version
   - This will also install npm (Node Package Manager)

2. Install Git:
   - Download and install Git from [https://git-scm.com/](https://git-scm.com/)

## Building the Production Version

1. Open a terminal in the project directory and run:
   ```bash
   npm install
   npm run build
   ```
   This will create a `dist` directory with the production-ready files.

## Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a GitHub account at [https://github.com/](https://github.com/)

2. Create a new repository:
   - Go to [https://github.com/new](https://github.com/new)
   - Name it `yourusername.github.io`
   - Make it public
   - Don't initialize with README

3. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git branch -M main
   git push -u origin main
   ```

4. Your site will be live at `https://yourusername.github.io`

### Option 2: Netlify (Free Tier)

1. Create a Netlify account:
   - Go to [https://www.netlify.com/](https://www.netlify.com/)
   - Sign up with your GitHub account

2. Deploy your site:
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Set build command to: `npm run build`
   - Set publish directory to: `dist`
   - Click "Deploy site"

3. Custom Domain (Optional):
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Follow the instructions to configure your domain

### Option 3: Vercel (Free Tier)

1. Create a Vercel account:
   - Go to [https://vercel.com/](https://vercel.com/)
   - Sign up with your GitHub account

2. Deploy your site:
   - Click "New Project"
   - Import your GitHub repository
   - Set build command to: `npm run build`
   - Set output directory to: `dist`
   - Click "Deploy"

## Testing Your Production Build Locally

Before deploying, you can test the production build locally:
```bash
npm run serve:prod
```
Then visit `http://localhost:3000` in your browser.

## Post-Deployment Checklist

1. Test all pages and features
2. Verify all links work correctly
3. Check mobile responsiveness
4. Ensure all images load properly
5. Test contact forms and interactive features
6. Verify SSL certificate is working (https)

## Maintenance

1. Regular updates:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```

2. Monitor your site:
   - Use Google Analytics for traffic
   - Check error logs in your hosting platform
   - Monitor site performance

## Support

If you encounter any issues:
1. Check the hosting platform's documentation
2. Visit their support forums
3. Contact their support team

Remember to keep your Node.js packages updated and regularly check for security updates.
