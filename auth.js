//will show sign out link if user is logged in, otherwise shows login link
(function(){
  const CURRENT_KEY = 'gameboxd_currentUser';

  function setupSignOut() {
    const cur = JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null');
    const navList = document.querySelector('nav ul');
    if (!navList) return;

    const loginLink = navList.querySelector('a[href="login.html"]');

    if (cur && cur.username) {
      if (loginLink) {
        loginLink.textContent = 'Sign out';
        loginLink.href = '#';
        loginLink.addEventListener('click', function (e) {
          e.preventDefault();
          localStorage.removeItem(CURRENT_KEY);
          window.location.href = 'login.html';
        });
      } else {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = 'Sign out';
        a.addEventListener('click', function (e) {
          e.preventDefault();
          localStorage.removeItem(CURRENT_KEY);
          window.location.href = 'login.html';
        });
        li.appendChild(a);
        navList.appendChild(li);
      }
    } else if (loginLink) {
      // links to login when not signed in
      loginLink.textContent = 'Login';
      loginLink.href = 'login.html';
    }
  }

  document.addEventListener('DOMContentLoaded', setupSignOut);
})();
