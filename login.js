import { ACCOUNTS_KEY, CURRENT_KEY } from './auth.js';

export function initializeLoginPage() {
    const loginForm = document.querySelector('#loginForm');
    const createAccountBtn = document.querySelector('#createAccountBtn');

    function handleLoginSubmit(event) {
        event.preventDefault();
        const username = document.querySelector('#username').value.trim();
        const password = document.querySelector('#password').value;

        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
        const userMatch = accounts.find(acc => acc.username === username && acc.password === password);

        if (userMatch) {
            localStorage.setItem(CURRENT_KEY, JSON.stringify({ username: userMatch.username }));
            window.location.href = 'profile.html';
        } else {
            alert('Invalid username or password.');
        }
    }

    function navigateToCreateAccount() {
        window.location.href = 'createAccount.html';
    }

    if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);
    if (createAccountBtn) createAccountBtn.addEventListener('click', navigateToCreateAccount);
}