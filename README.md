# XVI Store - E-commerce Demo Template

A simple static e-commerce template built with HTML, Tailwind CSS, and vanilla JavaScript.
It is designed for Netlify-style hosting and includes a product catalog, cart, checkout simulation, login/register flow, and an admin product manager.

## What is included

- `index.html` - dynamic storefront with product listing and trust sections
- `cart.html` - persistent shopping cart page using `localStorage`
- `transaction.html` - checkout simulation page
- `login.html` / `register.html` - demo user auth pages
- `admin.html` - admin panel for adding, editing, and deleting products
- `data/products.json` - product database seed file
- `js/store.js` - shared storage utilities for products, cart, and users
- `js/main.js`, `js/cart.js`, `js/checkout.js`, `js/auth.js`, `js/admin.js` - page scripts
- `css/style.css` - custom UI styles for the theme

## Features

- Product data stored in `localStorage` with a JSON seed fallback
- Cart persistence across refreshes
- Add, remove, and update cart items
- Checkout page simulation with order confirmation
- Login/register system using `localStorage`
- Admin panel for product management
- Responsive dark theme with gold accent styling
- SEO-ready meta tags and sitemap file

## How to run locally

1. Serve the directory with a local static server.
   - Example using Python:
     ```bash
     python -m http.server 8000
     ```
2. Open `http://localhost:8000` in your browser.

> Do not open `index.html` directly via file:// because fetching `data/products.json` requires a server.

## Admin access

Login with the demo admin credentials:

- Email: `admin@xvistore.com`
- Password: `admin123`

Use the admin panel at `admin.html` to manage products.

## Deployment

Upload the repository to Netlify, GitHub Pages, or any static hosting provider.

### Netlify

1. Create a new site from Git.
2. Select this repository.
3. Deploy the site.

### GitHub Pages

1. Push the repository to GitHub.
2. Enable Pages from the `main` branch.

## Customization

- Update product data in `data/products.json` or through `admin.html`
- Change site text in `index.html` and `transaction.html`
- Edit styles in `css/style.css`
- Update navigation links or metadata as needed
