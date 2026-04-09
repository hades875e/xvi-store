/* Main page behavior: products, category filters, cart count, toast, and exit intent */
let selectedCategory = 'All';

document.addEventListener('DOMContentLoaded', async () => {
    await initProducts();
    renderCategoryFilters();
    renderProducts();
    renderCartCount();
    renderUserStatus();
    setupExitIntent();
    startCountdown(754);
});

function renderCategoryFilters() {
    const products = getProducts();
    const categories = ['All', ...new Set(products.map((product) => product.category))];
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    container.innerHTML = categories
        .map((category) => {
            const active = selectedCategory === category ? 'bg-slate-100 text-slate-950 shadow-soft' : 'bg-slate-900 text-slate-300 hover:bg-slate-800';
            return `<button data-category="${category}" class="category-pill rounded-full px-4 py-2 text-sm font-semibold transition ${active}">${category}</button>`;
        })
        .join('');

    container.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            selectedCategory = button.dataset.category;
            renderCategoryFilters();
            renderProducts(selectedCategory);
        });
    });
}

function renderProducts(category = 'All') {
    const products = getProducts();
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const clothing = products.filter((product) => product.category === 'Clothing');
    const gameAccounts = products.filter((product) => product.category === 'Game Accounts');

    grid.innerHTML = `
        ${renderProductSection('Clothing Collection', 'Streetwear, luxury essentials, and styled outfits for the modern wardrobe.', clothing)}
        ${renderProductSection('Game Accounts & Digital Items', 'Verified game accounts, bundles, and premium digital drops with instant activation.', gameAccounts)}
    `;

    document.querySelectorAll('.addToCartButton').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const product = getProducts().find((item) => item.id === productId);
            addToCart(productId);
            renderCartCount();
            showToast(`${product.name} added to cart`);
        });
    });
}

function renderProductSection(title, subtitle, products) {
    if (!products.length) {
        return `<section class="product-section"><div class="section-header"><h2>${title}</h2><p>${subtitle}</p></div><p class="text-slate-400">No products available.</p></section>`;
    }

    return `
        <section class="product-section bg-slate-900/80 rounded-[2rem] border border-slate-800 p-8 shadow-soft">
            <div class="section-header mb-8">
                <p class="section-label text-sky-400">${title}</p>
                <h2 class="text-3xl font-extrabold text-white mt-3">${title}</h2>
                <p class="mt-3 max-w-2xl text-slate-400">${subtitle}</p>
            </div>
            <div class="grid gap-6 md:grid-cols-2">
                ${products.map((product) => renderProductCard(product)).join('')}
            </div>
        </section>`;
}

function renderProductCard(product) {
    const disabled = product.stock === 0 ? 'opacity-50 cursor-not-allowed' : '';
    const buttonLabel = product.stock === 0 ? 'Sold out' : 'Add to Cart';
    return `
        <article class="product-card rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 glass-card overflow-hidden ${disabled}">
            <div class="relative mb-4">
                <img src="${product.image}" alt="${product.name}" class="product-image rounded-3xl w-full h-64 object-cover object-center mb-4">
                <span class="product-badge absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-slate-950 bg-sky-400/95 rounded-full">${product.badge}</span>
            </div>
            <div class="mb-4">
                <span class="card-label">${product.category}</span>
                <h3 class="mt-3 text-2xl font-semibold text-white">${product.name}</h3>
                <p class="text-gray-400 body-text mt-3">${product.description}</p>
            </div>
            <div class="flex items-center justify-between gap-4 mb-6">
                <div>
                    <p class="text-3xl font-extrabold text-white">$${product.price.toFixed(2)}</p>
                    <p class="text-sm text-slate-500 mt-1">${product.stock} available</p>
                </div>
                <div class="text-sm text-slate-300">
                    <div class="flex items-center gap-1 mb-1">${createRatingStars(product.rating)}</div>
                    <span class="text-slate-500">${product.reviews} reviews</span>
                </div>
            </div>
            <button data-product-id="${product.id}" class="addToCartButton w-full rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition ${disabled}" ${product.stock === 0 ? 'disabled' : ''}>${buttonLabel}</button>
        </article>`;
}

function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return '★'.repeat(fullStars) + (halfStar ? '⯨' : '') + '☆'.repeat(emptyStars);
}

function showToast(message) {
    const toast = document.getElementById('toastMessage');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('active');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove('active');
    }, 1800);
}

function renderCartCount() {
    const count = cartCount();
    const badge = document.getElementById('cartCount');
    const mobileBadge = document.getElementById('cartCountMobile');
    if (badge) badge.textContent = count;
    if (mobileBadge) mobileBadge.textContent = count;
}

function renderUserStatus() {
    const user = getCurrentUser();
    const userStatus = document.getElementById('userStatus');
    if (!userStatus) return;
    if (user) {
        userStatus.innerHTML = `<span class="text-sky-300 font-semibold">${user.name}</span> | <a href="login.html?logout=1" class="text-slate-300 hover:text-sky-400">Logout</a>`;
    } else {
        userStatus.innerHTML = `<a href="login.html" class="text-slate-300 hover:text-sky-400">Login</a>`;
    }
}

function setupExitIntent() {
    const exitModal = document.getElementById('exitIntentModal');
    if (!exitModal) return;
    let shown = false;
    document.addEventListener('mouseout', (event) => {
        if (event.clientY < 10 && !shown) {
            exitModal.classList.remove('hidden');
            shown = true;
        }
    });
}

function closeExitModal() {
    const exitModal = document.getElementById('exitIntentModal');
    exitModal?.classList.add('hidden');
}

function startCountdown(duration) {
    const countdownEl = document.getElementById('heroCountdown');
    if (!countdownEl) return;
    let timer = duration;
    setInterval(() => {
        const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
        const seconds = String(timer % 60).padStart(2, '0');
        countdownEl.textContent = `${minutes}:${seconds}`;
        timer = timer > 0 ? timer - 1 : duration;
    }, 1000);
}

window.closeExitModal = closeExitModal;
window.startCountdown = startCountdown;
