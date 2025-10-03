# Tartan Realty Invest Ltd - Progressive Website

A modern, progressive web application for Tartan Realty Invest Ltd, featuring property investment, house hunting, and renovation services across the United Kingdom.

## Features

### 🏠 **Core Services**
- **Property Investment**: Strategic guidance with market analysis and ROI projections
- **House Hunting**: Personalized property search with exclusive listings
- **Premium Renovations**: Complete refurbishment services with luxury finishes

### 🎨 **Design Features**
- **UK-Inspired Color Palette**: Deep Navy Blues (#1e3a5f) and Elegant Golds (#c4951a)
- **Beautiful Typography**: Playfair Display (headings) + Inter (body text)
- **Responsive Design**: Mobile-first approach with smooth animations
- **Progressive Web App**: Offline functionality and app-like experience

### 🚀 **Technical Features**
- **Progressive Web App (PWA)**: Installable, works offline
- **Responsive Design**: Optimized for all devices
- **Modern JavaScript**: ES6+ with performance optimizations
- **CSS Grid & Flexbox**: Modern layout techniques
- **Service Worker**: Offline caching and background sync
- **Smooth Animations**: CSS transitions and JavaScript interactions
- **Form Validation**: Client-side validation with user feedback
- **SEO Optimized**: Semantic HTML and meta tags

## File Structure

```
tartanRealty/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet with UK color palette
├── script.js           # Interactive JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline functionality
├── assets/
│   └── logo.svg       # Tartan Realty logo
└── README.md          # This file
```

## Color Palette

### Primary Colors (British Theme)
- **Deep Navy Blue**: `#1e3a5f` - Primary brand color
- **Royal Blue**: `#2c5282` - Primary light variant
- **Midnight Blue**: `#152c42` - Primary dark variant

### Secondary Colors
- **Rich Gold**: `#c4951a` - Luxury accent color
- **Bright Gold**: `#d4a52a` - Secondary light variant
- **Deep Gold**: `#a67c00` - Secondary dark variant

### Accent Colors
- **British Racing Green**: `#22543d`
- **Rich Burgundy**: `#744210`
- **Warm Cream**: `#faf5f0`

## Setup Instructions

### 1. **Local Development**
```bash
# Clone or download the files to your local machine
cd tartanRealty

# Serve the files using a local server (required for PWA features)
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js (if you have it installed)
npx serve .

# Option 3: Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### 2. **Access the Website**
- Open your browser and go to `http://localhost:8000`
- The website will load with full functionality

### 3. **PWA Installation**
- On mobile devices, you'll see an "Add to Home Screen" prompt
- On desktop, look for the install button in the address bar
- The app will work offline after installation

## Browser Support

### Fully Supported
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Progressive Enhancement
- Older browsers will receive a functional experience without advanced features
- Service Worker features require modern browser support

## Performance Features

### Loading Optimizations
- **Critical CSS**: Above-the-fold styles prioritized
- **Font Display**: Optimized web font loading
- **Image Optimization**: WebP format with fallbacks
- **Preloading**: Critical resources preloaded

### Runtime Performance
- **Debounced Scroll Events**: Optimized scroll performance
- **Intersection Observer**: Efficient scroll-triggered animations
- **Minimal DOM Manipulation**: Efficient JavaScript execution

## Customization Guide

### 1. **Colors**
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #1e3a5f;
    --secondary-color: #c4951a;
    /* ... other variables */
}
```

### 2. **Content**
- **Company Info**: Update contact details in `index.html`
- **Services**: Modify service descriptions and features
- **Properties**: Replace property listings with real data
- **Images**: Replace placeholder images with actual photos

### 3. **Branding**
- **Logo**: Replace `assets/logo.svg` with your logo
- **Favicon**: Add favicon files to the root directory
- **App Icons**: Create icon files referenced in `manifest.json`

## Deployment Options

### 1. **GitHub Pages**
```bash
# Push to GitHub repository
# Enable GitHub Pages in repository settings
# Your site will be available at username.github.io/repository-name
```

### 2. **Netlify**
- Drag and drop the folder to Netlify
- Automatic HTTPS and CDN
- Custom domain support

### 3. **Vercel**
- Connect GitHub repository
- Automatic deployments on push
- Serverless functions support

### 4. **Traditional Web Hosting**
- Upload files via FTP/SFTP
- Ensure HTTPS is enabled for PWA features
- Configure proper MIME types for service worker

## SEO Optimization

### Included Features
- **Meta Tags**: Title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Ready for schema.org markup
- **Semantic HTML**: Proper heading hierarchy and landmarks

### Recommended Additions
- **Google Analytics**: Add tracking code
- **Google Search Console**: Verify ownership
- **Local SEO**: Add business schema markup
- **Sitemap**: Generate XML sitemap for search engines

## Security Considerations

### Current Security Features
- **HTTPS Required**: For PWA and modern features
- **CSP Ready**: Content Security Policy headers recommended
- **Form Validation**: Client-side input validation

### Production Recommendations
- **HTTPS Enforcement**: Redirect HTTP to HTTPS
- **Security Headers**: Implement security headers
- **Input Sanitization**: Server-side validation for forms
- **Rate Limiting**: Protect against spam and abuse

## Future Enhancements

### Planned Features
- **Property Search**: Advanced filtering and search
- **User Accounts**: Client portals and saved searches
- **Virtual Tours**: 360° property viewing
- **Investment Calculator**: ROI and mortgage calculators
- **Blog Section**: Property market insights and tips
- **Multi-language Support**: Welsh language option

### Technical Improvements
- **Backend Integration**: API for dynamic content
- **Database**: Property listings and user data
- **Authentication**: Secure user login system
- **Payment Processing**: Online consultation booking
- **Analytics**: Detailed user behavior tracking

## Support and Maintenance

### Browser Testing
- Test across all major browsers regularly
- Validate HTML and CSS
- Check accessibility compliance
- Monitor loading performance

### Content Updates
- Regular property listing updates
- Market analysis content refresh
- Service descriptions and pricing
- Team member information

## Contact Information

**Tartan Realty Invest Ltd**
- **Address**: 25 Cavendish Square, London, W1G 0PN
- **Phone**: +44 20 7946 0958
- **Email**: info@tartanrealtyinvestltd.co.uk
- **Website**: http://www.tartanrealtyinvestltd.co.uk

---

*Built with modern web technologies for the discerning UK property investor.*