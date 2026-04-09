# Voltix Gear - Customization Guide

A step-by-step guide to customize the Voltix Gear template for your own brand and niche.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Branding & Colors](#branding--colors)
3. [Products & Inventory](#products--inventory)
4. [Content Customization](#content-customization)
5. [Admin Settings](#admin-settings)
6. [Advanced Customization](#advanced-customization)

---

## Initial Setup

### Step 1: Deploy to Your Server

Choose your preferred static hosting:

**Netlify (Recommended)**
```bash
git push origin main
# Go to netlify.com → New site from Git → Select repo
```

**Vercel**
```bash
vercel deploy
```

**GitHub Pages**
```bash
# Push to GitHub, enable Pages in repo settings
```

**Manual FTP**
- Download all files
- Upload to your web server root

### Step 2: Test Locally First

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

---

## Branding & Colors

### File to Edit: `css/style.css`

#### Change Primary Colors (Lines 1-20)

```css
:root {
  /* Main brand color - used for buttons, links, accents */
  --primary: #38bdf8;           /* Change from sky-blue to your color */
  
  /* Background colors */
  --dark-bg: #0f172a;           /* Main background */
  --card-bg: #1e293b;           /* Card/section background */
  
  /* Accent color - secondary color */
  --accent: #fbbf24;            /* Gold - change if needed */
  
  /* Text colors */
  --text-primary: #ffffff;      /* Main text */
  --text-secondary: #cbd5e1;    /* Muted text */
  --text-muted: #64748b;        /* Very light text */
  
  /* Hover/Active states */
  --hover-alpha: 0.15;          /* Transparency for hover overlays */
}
```

#### Color Palette Ideas

**For Gaming/Tech:**
- Primary: #00d9ff (Cyan) or #ff006e (Pink)
- Accent: #fbbf24 (Gold)

**For Fashion:**
- Primary: #ec4899 (Pink) or #8b5cf6 (Purple)
- Accent: #fbbf24 (Gold)

**For E-Sports:**
- Primary: #22c55e (Green) or #06b6d4 (Cyan)
- Accent: #f97316 (Orange)

### Change Brand Name

Search and replace in ALL HTML files:

**Old:** `VOLTIX` or `Voltix Gear` or `Voltix`  
**New:** `YOUR_BRAND` or `Your Brand Name`

Files to update:
- `index.html` - Hero title, logo, footer
- `cart.html` - Navigation header
- `transaction.html` - Navigation header
- `login.html` - Auth titles
- `register.html` - Auth titles
- `admin.html` - Dashboard title
- `about.html` - About section, titles
- `contact.html` - All references
- `policies.html` - Footer

**Pro Tip:** Use VS Code Find & Replace (Ctrl+H) to replace all instances at once!

### Change Tagline/Hero Text

Edit `index.html` hero section (around line 60):

```html
<!-- FIND THIS: -->
<h1 class="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
    Premium performance gear — <span class="text-yellow-400">Welcome to Voltix Gear</span>
</h1>

<!-- REPLACE WITH: -->
<h1 class="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
    Your tagline here — <span class="text-sky-300">Welcome to Your Brand</span>
</h1>
```

### Change Discount Code

Edit `index.html` and search for `VOLTIX15`:

```html
<!-- Update these: -->
<span class="text-amber-300">VOLTIX15</span>  <!-- Discount announcement -->
<p class="text-2xl font-bold text-white mt-2">VOLTIX15</p>  <!-- Exit modal -->
```

---

## Products & Inventory

### File to Edit: `data/products.json`

#### Product Data Structure

```json
{
  "id": "unique-product-id",           // Unique identifier (use hyphens, no spaces)
  "name": "Product Name",               // Full product name
  "description": "Product description", // 1-2 line description
  "price": 199.99,                      // Price as number
  "stock": 25,                          // Inventory count
  "badge": "BESTSELLER",                // Badge type (see below)
  "category": "Your Category",          // Category name (any value works)
  "rating": 4.8,                        // Rating 0-5
  "reviews": 150                        // Review count
}
```

#### Available Badges

- `BESTSELLER` - Top seller
- `NEW` - New product
- `LIMITED` - Limited quantity
- `TOP RATED` - Highest rated
- `HOT DROP` - Popular/trendy
- `SALE` - On sale
- `ESSENTIAL` - Essential item
- `PREMIUM` - Premium tier
- `PRO EDITION` - Pro version

(Add custom badges by modifying the CSS in `css/style.css`)

#### Example: Add 2 New Products

```json
[
  // ... existing products ...
  {
    "id": "custom-product-1",
    "name": "Your New Product",
    "description": "Amazing features and benefits",
    "price": 149.99,
    "stock": 20,
    "badge": "NEW",
    "category": "Your Category",
    "rating": 4.9,
    "reviews": 45
  },
  {
    "id": "custom-product-2",
    "name": "Another Great Product",
    "description": "Even more amazing features",
    "price": 79.99,
    "stock": 50,
    "badge": "BESTSELLER",
    "category": "Accessories",
    "rating": 4.7,
    "reviews": 230
  }
]
```

#### Admin Dashboard Method

1. Go to `admin.html`
2. Enter credentials:
   - Email: `admin@voltixgear.com`
   - Password: `admin123`
3. Use the form to add/edit products
4. Changes save to localStorage automatically

**⚠️ Important:** Change default admin credentials before going live!

### Change Admin Credentials

Edit `js/auth.js`:

```javascript
// FIND THIS:
const DEFAULT_ADMIN = {
    email: 'admin@voltixgear.com',
    password: 'admin123'
};

// CHANGE TO:
const DEFAULT_ADMIN = {
    email: 'yourEmail@yourdomain.com',
    password: 'yourSecurePassword'
};
```

---

## Content Customization

### 1. Update About Page

Edit `about.html`:

```html
<!-- Update mission/vision sections: -->
<p class="text-white font-semibold">Your Mission Statement</p>
<p class="mt-3 text-slate-400">Your mission description here.</p>
```

### 2. Update Contact Page

Edit `contact.html`:

```html
<!-- Update contact details: -->
<p class="text-white font-semibold">support@youremail.com</p>
<p class="text-white font-semibold">sales@youremail.com</p>
<p class="text-white font-semibold">Your Location</p>
```

### 3. Update Policies Page

Edit `policies.html`:

```html
<section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-10 shadow-soft">
    <h2 class="text-3xl font-semibold text-white mb-4">Your Policy Title</h2>
    <p class="text-slate-400 body-text leading-8">Your policy content here.</p>
</section>
```

### 4. Update Navigation

Edit header in each HTML file or create a shared header snippet:

```html
<div class="flex flex-wrap items-center gap-4 text-sm text-slate-300">
    <a href="index.html" class="hover:text-sky-300 transition">Shop</a>
    <a href="about.html" class="hover:text-sky-300 transition">About</a>
    <a href="contact.html" class="hover:text-sky-300 transition">Contact</a>
    <a href="policies.html" class="hover:text-sky-300 transition">Policies</a>
</div>
```

---

## Admin Settings

### Change Default Admin Credentials

**File:** `js/auth.js`

Before deploying, update:

```javascript
const DEFAULT_ADMIN = {
    email: 'admin@voltixgear.com',
    password: 'admin123'
};
```

To:

```javascript
const DEFAULT_ADMIN = {
    email: 'your.email@company.com',
    password: 'a_secure_password_here'
};
```

### Admin Dashboard Access

1. Navigate to `/admin.html`
2. Login with your credentials
3. Add/edit/delete products
4. Changes save to browser's localStorage

**Note:** Data persists only in the browser that edited it. Share `localStorage` between browsers by exporting products.

---

## Advanced Customization

### 1. Add More Product Categories

Products automatically filter by the `category` field in `data/products.json`. No code changes needed!

Example categories:
```json
"category": "Gaming Keyboards"
"category": "Mechanical Keyboards"
"category": "Wireless Keyboards"
```

### 2. Change Product Images

The template uses Unsplash URLs. Replace in `js/main.js`:

```javascript
// FIND product card HTML generation
// Replace Unsplash URLs with your image URLs
const imageUrl = 'https://your-image-url.com/product.jpg';
```

Or upload images to your server and reference locally:

```html
<img src="images/product-1.jpg" alt="Product name" />
```

### 3. Modify Animations

Edit `css/style.css` for animation speeds:

```css
.product-card {
  transition: all 0.3s ease;  /* Change 0.3s to faster/slower */
  transform: scale(1);
}

.product-card:hover {
  transform: scale(1.05);  /* Change scale value for different effect */
  box-shadow: 0 20px 40px rgba(56, 189, 248, 0.3);
}
```

### 4. Add More Pages

Create `yourpage.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Page | Brand Name</title>
    <link href="css/style.css" rel="stylesheet">
</head>
<body class="bg-slate-950 text-white">
    <header><!-- Navigation --></header>
    <main><!-- Your content --></main>
    <script src="js/store.js"></script>
</body>
</html>
```

Add link to navigation on all pages.

### 5. Customize Cart/Checkout Flow

Edit `js/cart.js` and `js/checkout.js`:

```javascript
// Change button text, messages, or validation logic
// Add shipping cost calculations
// Customize order confirmation message
```

### 6. Add Email Notifications (Advanced)

To send confirmation emails:

1. Use Netlify Functions or Vercel Functions
2. Integrate with EmailJS API
3. Call API from `js/checkout.js` after order confirmation

---

## Testing Checklist

- [ ] Colors match brand identity
- [ ] All product data displays correctly
- [ ] Cart functionality works
- [ ] Checkout flow completes
- [ ] Admin credentials work
- [ ] Mobile layout responsive
- [ ] All links work
- [ ] Trust elements visible
- [ ] Navigation links updated
- [ ] SEO meta tags updated

---

## Deployment Checklist

- [ ] Change admin credentials
- [ ] Update brand name everywhere
- [ ] Update colors
- [ ] Add products
- [ ] Update About/Contact/Policies
- [ ] Test full user journey
- [ ] Deploy to hosting
- [ ] Add Google Analytics
- [ ] Set up email notifications (optional)
- [ ] Add favicon
- [ ] Test on real mobile device

---

## Common Questions

**Q: Can I use this theme for fashion/beauty?**  
A: Yes! Change colors, products, and branding. The template works for any niche.

**Q: How do I add shipping costs?**  
A: Edit `js/checkout.js` to calculate and add shipping to cart total.

**Q: Can I integrate real payments?**  
A: Yes, integrate Stripe, PayPal, or Square APIs in `js/checkout.js`.

**Q: Where is data stored?**  
A: All data is stored in browser's `localStorage`. No backend needed.

**Q: Can I export/backup products?**  
A: Yes, use browser DevTools → Application → Local Storage to export JSON.

**Q: How do I add product images?**  
A: Replace Unsplash URLs in `js/main.js` with your own image URLs or local paths.

---

## Support

For issues or questions, refer to:
- `README.md` - Main documentation
- `js/store.js` - Storage logic
- `js/main.js` - Product rendering
- Browser Console (F12) - Error messages

---

**Happy customizing! 🚀**
