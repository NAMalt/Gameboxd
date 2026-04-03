import { AuthManager, Database } from './auth.js';

export class LoginApp {//constructor that sends you to auth.js to get the new authmanager information, and then gets the login form and create account button
    constructor() {
        this.auth = new AuthManager();
        this.loginForm = document.querySelector('#loginForm');
        this.createAccountBtn = document.querySelector('#createAccountBtn');
    }

   
    init() {//makes these two buttons even listeners for sending you to createaccount or logging you in
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (event) => this.handleLoginSubmit(event));
        }
        if (this.createAccountBtn) {
            this.createAccountBtn.addEventListener('click', () => this.navigateToCreateAccount());
        }
    }

    
    async handleLoginSubmit(event) {
        event.preventDefault();
        
        const username = document.querySelector('#username').value.trim();//saves username as the value of username field
        const password = document.querySelector('#password').value;//saves password as the value of the password field

        if (!username || !password) {
            alert('Please enter both username and password.');
            return;//checks to see if fields are emoty
        }

        // Fetch accounts asynchronously using the Database class, and then checks to see if there is a match for the username and password
        const accounts = await Database.get(this.auth.ACCOUNTS_KEY) || [];
        const userMatch = accounts.find(acc => acc.username === username && acc.password === password);

        if (userMatch) {
            await Database.save(this.auth.CURRENT_KEY, { username: userMatch.username });
            window.location.href = 'profile.html';
        } else {
            alert('Invalid username or password.');
        }
    }

    navigateToCreateAccount() {
        window.location.href = 'createAccount.html';
    }//navigate to create account when the create account button is clicked
}