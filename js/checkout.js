/* Checkout page logic: show cart summary and simulate purchase */
document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutSummary();
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = checkoutForm.querySelector('#checkoutEmail').value.trim();
        const method = checkoutForm.querySelector('#checkoutPayment').value;
        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        const total = calculateCartTotal();
        clearCart();
        document.getElementById('checkoutContent').innerHTML = `
      <div class="rounded-[2rem] border border-yellow-400 bg-slate-950/95 p-10 shadow-soft text-center">
        <h2 class="text-3xl font-extrabold text-yellow-400 mb-4">Order Confirmed</h2>
        <p class="text-gray-300 body-text mb-4">Thanks, ${email}! Your order is confirmed for <strong>$${total.toFixed(2)}</strong>.</p>
        <p class="text-gray-400 mb-6">Delivery instructions have been sent to your inbox. You can continue shopping or review your order details.</p>
        <a href="index.html" class="inline-flex rounded-full bg-yellow-400 px-8 py-4 text-slate-900 font-bold hover:bg-yellow-500 transition">Back to Store</a>
      </div>`;
        renderCartCount();
    });
});

function renderCheckoutSummary() {
    const cart = getCart();
    const products = getProducts();
    const summary = document.getElementById('checkoutSummary');
    const totalValue = document.getElementById('checkoutTotal');
    if (!summary || !totalValue) return;

    if (cart.length === 0) {
        summary.innerHTML = '<p class="text-gray-400">Your cart is empty. Add items before checking out.</p>';
        totalValue.textContent = '$0.00';
        return;
    }

    summary.innerHTML = cart
        .map((item) => {
            const product = products.find((product) => product.id === item.id);
            if (!product) return '';
            return `
        <div class="flex items-center justify-between border-b border-slate-800 py-4">
          <div>
            <p class="text-white font-semibold">${product.name}</p>
            <p class="text-sm text-gray-400">Qty: ${item.quantity}</p>
          </div>
          <span class="text-white font-bold">$${(product.price * item.quantity).toFixed(2)}</span>
        </div>`;
        })
        .join('');

    totalValue.textContent = `$${calculateCartTotal().toFixed(2)}`;
}

function renderCartCount() {
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    badge.textContent = cartCount();
}

window.renderCartCount = renderCartCount;
