
export class Database { //local storage wrapper class, uses async methods to operate on promises
    static async get(key) {
        const data = JSON.parse(localStorage.getItem(key) || 'null');
        return Promise.resolve(data);
    }

    static async save(key, data) {//saves the key value pair to localstorage
        localStorage.setItem(key, JSON.stringify(data));
        return Promise.resolve(true);
    }

    static async remove(key) {//removes the key value from localstorage
        localStorage.removeItem(key);
        return Promise.resolve(true);
    }
}

export class AuthManager { //login/logout manager
    constructor() {//stores keys as class properties
        this.ACCOUNTS_KEY = 'gameboxd_accounts';
        this.CURRENT_KEY = 'gameboxd_currentUser';
    }

    async getLoggedInUser() {//use await and get to get the key
        return await Database.get(this.CURRENT_KEY);
    }

    async logout() {//logs you out by doing the opposite of getLoggedInUser, and then relocates you to login,html
        await Database.remove(this.CURRENT_KEY);
        window.location.href = 'login.html';
    }

    async setupNavigationState() { //login/logout UI changes
        const user = await this.getLoggedInUser();
        const loginLink = document.querySelector('#loginNavLink');//user becomes the result of getLoggedInUser, 
        // and then if there is a user and a login link, the login link becomes sign out and adds an event listener 
        // to log you out when you click it   
        
        if (user && user.username && loginLink) {
            loginLink.textContent = 'Sign out';
            loginLink.href = '#';
            loginLink.addEventListener('click', (event) => {
                event.preventDefault();
                this.logout();
            });
        }
    }
}