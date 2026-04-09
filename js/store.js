/* Shared store utilities for products, cart, and auth */
const STORAGE_KEYS = {
    PRODUCTS: 'voltixProducts',
    PRODUCT_VERSION: 'voltixProductVersion',
    CART: 'voltixCart',
    USERS: 'voltixUsers',
    CURRENT_USER: 'voltixCurrentUser',
    LEGACY_PRODUCTS: 'xviProducts',
    LEGACY_CART: 'xviCart',
    LEGACY_USERS: 'xviUsers',
    LEGACY_CURRENT_USER: 'xviCurrentUser'
};
const PRODUCT_SEED_VERSION = 1;

function readStorage(primaryKey, fallbackKey) {
    return localStorage.getItem(primaryKey) || localStorage.getItem(fallbackKey);
}

async function initProducts() {
    const currentVersion = Number(localStorage.getItem(STORAGE_KEYS.PRODUCT_VERSION));
    const stored = readStorage(STORAGE_KEYS.PRODUCTS, STORAGE_KEYS.LEGACY_PRODUCTS);
    if (stored && currentVersion >= PRODUCT_SEED_VERSION) return JSON.parse(stored);

    try {
        const response = await fetch('./data/products.json');
        const products = await response.json();
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        localStorage.setItem(STORAGE_KEYS.PRODUCT_VERSION, String(PRODUCT_SEED_VERSION));
        return products;
    } catch (error) {
        console.error('Unable to load product data:', error);
        return [];
    }
}

function getProducts() {
    const stored = readStorage(STORAGE_KEYS.PRODUCTS, STORAGE_KEYS.LEGACY_PRODUCTS);
    return stored ? JSON.parse(stored) : [];
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.PRODUCT_VERSION, String(PRODUCT_SEED_VERSION));
}

function getCart() {
    const stored = readStorage(STORAGE_KEYS.CART, STORAGE_KEYS.LEGACY_CART);
    return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function clearCart() {
    localStorage.removeItem(STORAGE_KEYS.CART);
}

function getUsers() {
    const stored = readStorage(STORAGE_KEYS.USERS, STORAGE_KEYS.LEGACY_USERS);
    if (stored) return JSON.parse(stored);

    const defaultUsers = [
        { email: 'admin@voltixgear.com', password: 'admin123', name: 'Admin', role: 'admin' }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    return defaultUsers;
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getCurrentUser() {
    const stored = readStorage(STORAGE_KEYS.CURRENT_USER, STORAGE_KEYS.LEGACY_CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
}

function setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

function logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const item = cart.find((line) => line.id === productId);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    saveCart(cart);
    return cart;
}

function updateCartItem(productId, quantity) {
    const cart = getCart().map((item) => ({ ...item }));
    const match = cart.find((item) => item.id === productId);
    if (match) {
        match.quantity = Math.max(Number(quantity), 1);
    }
    saveCart(cart.filter((item) => item.quantity > 0));
    return getCart();
}

function removeCartItem(productId) {
    const cart = getCart().filter((item) => item.id !== productId);
    saveCart(cart);
    return cart;
}

function cartCount() {
    return getCart().reduce((total, item) => total + Number(item.quantity), 0);
}

function registerUser(email, password, name) {
    const users = getUsers();
    const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = { email, password, name, role: 'customer' };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser({ email: newUser.email, name: newUser.name, role: newUser.role });
    return { success: true, user: newUser };
}

function loginUser(email, password) {
    const users = getUsers();
    const match = users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
    if (!match) {
        return { success: false, message: 'Invalid email or password.' };
    }
    setCurrentUser({ email: match.email, name: match.name, role: match.role });
    return { success: true, user: match };
}

function requireAuth(redirectPage = 'login.html') {
    if (!getCurrentUser()) {
        window.location.href = `${redirectPage}?next=${encodeURIComponent(window.location.pathname)}`;
        return false;
    }
    return true;
}
