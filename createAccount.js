import { ACCOUNTS_KEY } from './auth.js';


export function initializeCreateAccountPage() {
    const createForm = document.querySelector('#createForm');

    function handleCreateAccountSubmit(event) {
        event.preventDefault();
        const username = document.querySelector('#newUsername').value.trim();
        const password = document.querySelector('#newPassword').value;

        if (!username || !password) {
            alert('Please enter a username and password.');
            return;
        }

        const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
        
        if (accounts.some(acc => acc.username === username)) {
            alert('That username is already taken. Choose another.');
            return;
        }

        accounts.push({ username, password });
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

        alert('Account created. You will be redirected to login.');
        window.location.href = 'login.html';
    }

    if (createForm) createForm.addEventListener('submit', handleCreateAccountSubmit);
}