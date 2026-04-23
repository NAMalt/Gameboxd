import { Database, User } from './auth.js';

export class CreateAccountApp {
    constructor() {
        this.form = document.querySelector('#createForm');
    }//created the form for createAccount

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (event) => this.handleCreateAccountSubmit(event));
        }
    }

    async handleCreateAccountSubmit(event) {
        event.preventDefault();

        const username = document.querySelector('#newUsername').value.trim();
        const password = document.querySelector('#newPassword').value;

        const accounts = await Database.getAccounts();
        if (accounts.some(acc => acc.username === username)) {
            alert('Username taken!');
            return;
        }//searches array for duplicate info and alerts if found

        const newUser = new User(username, password);
        await Database.saveAccount(newUser);
        //saves info to array

        alert('Account created!');
        //redirects with the user in the URL
        window.location.href = `login.html?user=${username}`;
    }
}