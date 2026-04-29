export class User {
    constructor(username, password) {
        this.username = username;
        this.password = password; // Only used as a comparing key now
        this.profilePicture = "images/black.jpg"; // Default pfp, just a black image
        this.reviews = []; // Default empty array
        this.likedGames = []; // Default empty array
    }
}

// In-memory storage, defaulting w/ a test account
const accounts = [new User("test", "password")];


export class Database {
    static async getAccounts() {
        return Promise.resolve(accounts);
    }//returns the array of accounts as a promise

    static async saveAccount(newUser) {
        accounts.push(newUser);
        return Promise.resolve(true);
    }//pushes a new user to the accounts array and returns true as a promise

    static async findUser(username, password) {
        const allAccounts = await this.getAccounts();
        const user = allAccounts.find(
            (acc) => acc.username === username && acc.password === password
        );//searches for the user information in the accounts array and returns the user if found, otherwise returns null
        return Promise.resolve(user || null);
    }
}

export class AuthManager {
    async getLoggedInUser() {
        //looks at the url for users now instead of local storage
        const params = new URLSearchParams(window.location.search);
        const username = params.get('user');
        
        if (!username) return null;

        const allAccounts = await Database.getAccounts();
        // Returns the class instance
        return allAccounts.find(u => u.username === username) || null;
    }

    async login(user) {
        // supposed to pass the user to the profile page, but doesn't work too well
        window.location.href = `profile.html?user=${user.username}`;
    }

    async logout() {
        window.location.href = 'login.html';
    }

    async setupNavigationState() {
        const user = await this.getLoggedInUser();
        const loginLink = document.querySelector('#loginNavLink');
        
        if (user && loginLink) {
            loginLink.textContent = 'Sign out';
            loginLink.href = '#';
            loginLink.addEventListener('click', (event) => {
                event.preventDefault();
                this.logout();
            });
        }
    }
}