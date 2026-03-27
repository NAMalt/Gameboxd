export const ACCOUNTS_KEY = 'gameboxd_accounts';
export const CURRENT_KEY = 'gameboxd_currentUser';

export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null');
}

export function logoutUser() {
    localStorage.removeItem(CURRENT_KEY);
    window.location.href = 'login.html';
}

function handleLogoutClick(event) {
    event.preventDefault();
    logoutUser();
}

//called by index.html  
export function setupNavigationState() {
    const user = getLoggedInUser();
    const loginLink = document.querySelector('#loginNavLink');
    
    if (user && user.username && loginLink) {
        loginLink.textContent = 'Sign out';
        loginLink.href = '#';
        loginLink.addEventListener('click', handleLogoutClick);
    }
}