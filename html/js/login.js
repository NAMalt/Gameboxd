import { AuthManager } from './auth.js';

export class LoginApp {
    constructor() {
        this.auth = new AuthManager();
        this.loginForm = document.querySelector('#loginForm');
    }

    init() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (event) => this.handleLoginSubmit(event));
        }

        const createBtn = document.querySelector('#createAccountBtn');
        if (createBtn) {
            createBtn.addEventListener('click', () => {
                window.location.href = 'createAccount.html';
            });
        }
    }

    async handleLoginSubmit(event) {
        event.preventDefault();
        
        const usernameInput = document.querySelector('#username').value.trim();
        const passwordInput = document.querySelector('#password').value;

        try {
            const response = await fetch('/api/accounts');
            if (!response.ok) throw new Error("Failed to fetch accounts");
            
            const accounts = await response.json();

            const userMatch = accounts.find(u => 
                u.username === usernameInput && u.password === passwordInput
            );

            if (userMatch) {
                await this.auth.login(userMatch);
            } else {
                alert('Invalid username or password.');
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Server connection failed. Make sure server.js is running.");
        }
    }
}