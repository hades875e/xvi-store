/* Cart page behavior and persistent localStorage cart */
document.addEventListener('DOMContentLoaded', () => {
    renderCartCount();
    renderCartItems();
    renderUserStatus();
});

function renderCartItems() {
    const cart = getCart();
    const products = getProducts();
    const content = document.getElementById('cartContent');
    const totalEl = document.getElementById('cartTotal');
    const emptyState = document.getElementById('emptyCartMessage');

    if (!content || !totalEl || !emptyState) return;

    if (cart.length === 0) {
        content.innerHTML = '';
        totalEl.textContent = '$0.00';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    const rows = cart.map((item) => {
        const product = products.find((product) => product.id === item.id);
        if (!product) return '';
        const lineTotal = (product.price * item.quantity).toFixed(2);
        return `
      <div class="rounded-3xl bg-slate-950 border border-slate-800 p-6 grid gap-4 md:grid-cols-[1fr_auto] items-center">
        <div>
          <h3 class="text-xl font-semibold text-white">${product.name}</h3>
          <p class="text-gray-400 body-text mt-2">${product.description}</p>
        </div>
        <div class="space-y-3 text-right">
          <div class="text-white font-bold text-lg">$${lineTotal}</div>
          <div class="flex items-center justify-end gap-2">
            <label class="text-sm text-gray-400">Qty</label>
            <input type="number" min="1" value="${item.quantity}" data-product-id="${item.id}" class="cartQtyInput w-20 rounded-full bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:border-yellow-400 focus:outline-none"/>
          </div>
          <button data-product-id="${item.id}" class="removeCartButton inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:border-red-400 hover:text-white transition"><i class="fas fa-trash"></i> Remove</button>
        </div>
      </div>`;
    }).join('');

    content.innerHTML = rows;
    totalEl.textContent = `$${calculateCartTotal().toFixed(2)}`;
    attachCartActions();
}

function calculateCartTotal() {
    const cart = getCart();
    const products = getProducts();
    return cart.reduce((sum, item) => {
        const product = products.find((product) => product.id === item.id);
        return product ? sum + product.price * item.quantity : sum;
    }, 0);
}

function attachCartActions() {
    document.querySelectorAll('.cartQtyInput').forEach((input) => {
        input.addEventListener('change', () => {
            const productId = input.dataset.productId;
            updateCartItem(productId, input.value);
            renderCartItems();
            renderCartCount();
        });
    });

    document.querySelectorAll('.removeCartButton').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeCartItem(productId);
            renderCartItems();
            renderCartCount();
        });
    });
}

function renderCartCount() {
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    badge.textContent = cartCount();
}

function renderUserStatus() {
    const user = getCurrentUser();
    const userStatus = document.getElementById('userStatus');
    if (!userStatus) return;
    if (user) {
        userStatus.innerHTML = `<span class="text-yellow-400 font-semibold">${user.name}</span> | <a href="login.html?logout=1" class="text-gray-300 hover:text-yellow-400">Logout</a>`;
    } else {
        userStatus.innerHTML = `<a href="login.html" class="text-gray-300 hover:text-yellow-400">Login</a>`;
    }
}

function proceedToTransaction() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty. Add a product first.');
        return;
    }
    window.location.href = 'transaction.html';
}

window.proceedToTransaction = proceedToTransaction;
