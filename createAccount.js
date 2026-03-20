// createAccount.js — adds a new account to localStorage then returns to login
(function(){
  const ACCOUNTS_KEY = 'gameboxd_accounts';
  const form = document.getElementById('createForm');
  const usernameEl = document.getElementById('newUsername');
  const passwordEl = document.getElementById('newPassword');

  function loadAccounts(){
    try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function saveAccounts(list){
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list));
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const user = usernameEl.value.trim();
    const pass = passwordEl.value;
    if (!user || !pass) { alert('Please enter a username and password.'); return; }

    const accounts = loadAccounts();
    if (accounts.find(a => a.username === user)) {
      alert('That username is already taken. Choose another.');
      return;
    }

    accounts.push({ username: user, password: pass });
    saveAccounts(accounts);

    alert('Account created. You will be redirected to login.');
    window.location.href = 'login.html';
  });

})();
