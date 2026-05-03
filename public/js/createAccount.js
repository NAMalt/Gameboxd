import { User } from './auth.js';

export class CreateAccountApp {
    constructor() {
        this.form = document.querySelector('#createForm');
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (event) => this.handleCreateAccountSubmit(event));
        }
    }

    async handleCreateAccountSubmit(event) {
        event.preventDefault();

        const username = document.querySelector('#newUsername').value.trim();
        const password = document.querySelector('#newPassword').value;

        const newUser = new User(username, password);

        // POST route
        try {
            const response = await fetch('/api/accounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert('Account created!');
                window.location.href = `login.html?user=${username}`;
            } else {
                const err = await response.json();
                alert(err.message);
            }
        } catch (error) {
            console.error("Transmission failed:", error);
        }
    }
}