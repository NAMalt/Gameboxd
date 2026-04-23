// login.js
import { AuthManager, Database } from './auth.js';

export class LoginApp {
    constructor() {
        this.auth = new AuthManager();
        this.loginForm = document.querySelector('#loginForm');
    }

    init() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (event) => this.handleLoginSubmit(event));
        }
    }

    async handleLoginSubmit(event) {
        event.preventDefault();
        
        const usernameInput = document.querySelector('#username').value.trim();
        const passwordInput = document.querySelector('#password').value;

        const userMatch = await Database.findUser(usernameInput, passwordInput);
        //finds the user information in the accounts array and returns the user if found, otherwise returns null

        if (userMatch) {
            // This method handles the URL-based redirect
            await this.auth.login(userMatch);
        } else {
            alert('Invalid username or password.');
        }
    }
}