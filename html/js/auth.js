export class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.profilePicture = "images/black.jpg";
        this.reviews = [];
        this.likedGames = [];
    }
}

export class AuthManager {
    async getLoggedInUser() {
        const params = new URLSearchParams(window.location.search);
        const username = params.get('user');
        if (!username) return null;

        //Fetch the latest accounts from the server
        const response = await fetch('/api/accounts');
        const accounts = await response.json();
        return accounts.find(u => u.username === username) || null;
    }

    async login(user) {
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
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }
}