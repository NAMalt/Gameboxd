//(for now) checks info with localstorage accounts and saves current user on success
(function(){
  const ACCOUNTS_KEY = 'gameboxd_accounts';
  const CURRENT_KEY = 'gameboxd_currentUser';

  const form = document.getElementById('loginForm');
  const usernameEl = document.getElementById('username');
  const passwordEl = document.getElementById('password');
  const createBtn = document.getElementById('createAccountBtn');

  function loadAccounts(){
    try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]'); }
    catch (e) { return []; }
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const user = usernameEl.value.trim();
    const pass = passwordEl.value;
    if (!user || !pass) { alert('Please enter both username and password.'); return; }

    const accounts = loadAccounts();
    const match = accounts.find(a => a.username === user && a.password === pass);
    if (!match) {
      alert('Invalid username or password.');
      return;
    }

    // Saves current user and redirects to profile
    localStorage.setItem(CURRENT_KEY, JSON.stringify({ username: match.username }));
    window.location.href = 'profile.html';
  });

  createBtn.addEventListener('click', function(){
    window.location.href = 'createAccount.html';
  });

})();
