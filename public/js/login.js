import { AuthManager } from './auth.js';

export class LoginApp {
    constructor() {
        this.auth = new AuthManager();
        this.loginForm = document.querySelector('#loginForm');
    }

    init() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLoginSubmit(e));
        }
        const createBtn = document.querySelector('#createAccountBtn');
        if (createBtn) {
            createBtn.addEventListener('click', () => { window.location.href = 'createAccount.html'; });
        }
    }

    async handleLoginSubmit(event) {
        event.preventDefault(); // Stop refresh
        
        const username = document.querySelector('#username').value.trim();
        const password = document.querySelector('#password').value;

        const response = await fetch('/api/accounts'); //Gets latest JSON data
        const accounts = await response.json();

        const userMatch = accounts.find(u => u.username === username && u.password === password);

        if (userMatch) {
            this.auth.login(userMatch); // Redirects to profile.html?user=...
        } else {
            alert('Invalid credentials.');
        }
    }
}