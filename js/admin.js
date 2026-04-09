/* Admin panel for adding, editing, and deleting products */
document.addEventListener('DOMContentLoaded', async () => {
    await initProducts();
    if (!requireAdmin()) return;
    renderAdminProducts();
    attachAdminActions();
});

function requireAdmin() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        document.getElementById('adminContent').innerHTML = `
      <div class="rounded-[2rem] border border-red-500 bg-slate-950/95 p-10 text-center text-red-300 shadow-soft">
        <h2 class="text-3xl font-extrabold mb-4">Access denied</h2>
        <p class="text-gray-400 body-text mb-4">You must be signed in as an admin to view this page.</p>
        <a href="login.html?next=admin.html" class="inline-flex rounded-full bg-yellow-400 px-6 py-3 text-slate-900 font-bold hover:bg-yellow-500 transition">Sign in as admin</a>
      </div>`;
        return false;
    }
    return true;
}

function renderAdminProducts() {
    const products = getProducts();
    const list = document.getElementById('adminProductList');
    if (!list) return;
    list.innerHTML = products
        .map((product) => `
      <div class="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 grid gap-4 md:grid-cols-[1fr_auto] items-center">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-amber-300 font-semibold">${product.category}</p>
          <h3 class="text-xl font-semibold text-white">${product.name}</h3>
          <p class="text-gray-400 body-text mt-2">${product.description}</p>
        </div>
        <div class="flex flex-wrap items-center gap-3 justify-end">
          <span class="text-white font-bold">$${product.price}</span>
          <span class="text-sm text-gray-400">Stock: ${product.stock}</span>
          <button data-product-id="${product.id}" class="editProductBtn rounded-full border border-yellow-400 px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-400 hover:text-slate-950 transition">Edit</button>
          <button data-product-id="${product.id}" class="deleteProductBtn rounded-full border border-red-500 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-slate-950 transition">Delete</button>
        </div>
      </div>`)
        .join('');
    attachProductButtons();
}

function attachAdminActions() {
    const productForm = document.querySelector('#productForm');
    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();
            saveAdminProduct();
        });
    }
}

function attachProductButtons() {
    document.querySelectorAll('.deleteProductBtn').forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.dataset.productId;
            deleteProduct(id);
            renderAdminProducts();
        });
    });

    document.querySelectorAll('.editProductBtn').forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.dataset.productId;
            populateEditForm(id);
        });
    });
}

function populateEditForm(id) {
    const product = getProducts().find((product) => product.id === id);
    if (!product) return;
    const form = document.getElementById('productForm');
    form.productId.value = product.id;
    form.name.value = product.name;
    form.description.value = product.description;
    form.price.value = product.price;
    form.stock.value = product.stock;
    form.category.value = product.category;
    form.badge.value = product.badge;
}

function saveAdminProduct() {
    const form = document.getElementById('productForm');
    const id = form.productId.value || `prod-${Date.now()}`;
    const updatedProduct = {
        id,
        name: form.name.value.trim(),
        description: form.description.value.trim(),
        price: Number(form.price.value),
        stock: Number(form.stock.value),
        category: form.category.value.trim(),
        badge: form.badge.value.trim() || 'New'
    };

    const products = getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index >= 0) {
        products[index] = updatedProduct;
    } else {
        products.push(updatedProduct);
    }
    saveProducts(products);
    form.reset();
    renderAdminProducts();
}

function deleteProduct(id) {
    const products = getProducts().filter((product) => product.id !== id);
    saveProducts(products);
}
