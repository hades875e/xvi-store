/* Authentication pages: register, login, and logout flow */
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.search.includes('logout=1')) {
        logoutUser();
        window.location.href = 'login.html';
        return;
    }

    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');
    const userNav = document.getElementById('userStatus');
    if (userNav) renderUserStatus();

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = loginForm.querySelector('#loginEmail').value.trim();
            const password = loginForm.querySelector('#loginPassword').value.trim();
            const result = loginUser(email, password);
            if (!result.success) {
                showAuthMessage(result.message, 'error');
                return;
            }
            const urlParams = new URLSearchParams(window.location.search);
            const next = urlParams.get('next') || 'index.html';
            window.location.href = next;
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = registerForm.querySelector('#registerName').value.trim();
            const email = registerForm.querySelector('#registerEmail').value.trim();
            const password = registerForm.querySelector('#registerPassword').value.trim();
            const result = registerUser(email, password, name);
            if (!result.success) {
                showAuthMessage(result.message, 'error');
                return;
            }
            window.location.href = 'index.html';
        });
    }
});

function showAuthMessage(text, type = 'info') {
    const messageBox = document.getElementById('authMessage');
    if (!messageBox) return;
    messageBox.textContent = text;
    messageBox.className = type === 'error' ? 'text-red-400' : 'text-green-400';
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
