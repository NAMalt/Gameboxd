import { Database, AuthManager } from './auth.js';

export class CreateAccountApp {//constructor that sends you to auth.js to get the new authmanager information
    constructor() {
        this.auth = new AuthManager();
        this.form = document.querySelector('#createForm');
    }

    init() {//event listener for the form submit, and then sends you to the handleCreateAccountSubmit function
        if (this.form) {
            this.form.addEventListener('submit', (event) => this.handleCreateAccountSubmit(event));
        }
    }

    async handleCreateAccountSubmit(event) {//create account, gets the username and password and then checks if they are valid
        // prevents the default form submission behavior
        event.preventDefault();

        const username = document.querySelector('#newUsername').value.trim();
        const password = document.querySelector('#newPassword').value;

        if (!username || !password) {
            alert('Please enter a username and password.');
            return;
        }

        const accounts = await Database.get(this.auth.ACCOUNTS_KEY) || [];//the array of accounts gotten from the database/local storage
        
        if (accounts.some(acc => acc.username === username)) {
            alert('That username is already taken. Choose another.');
            return;
        }//function to check if account username is taken, does not allow you to use it if so. compares it to users in the array

        accounts.push({ username, password });//pushes new information to the array
        await Database.save(this.auth.ACCOUNTS_KEY, accounts);//saves the new array to the database/local storage

        alert('Account created. You will be redirected to login.');
        window.location.href = 'login.html';
    }
}