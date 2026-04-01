import { getLoggedInUser } from "./auth.js";

export function initializeProfilePage() {
    try {
        const user = getLoggedInUser();
        if (user && user.username) {
            const el = document.getElementById('profileUsername');
            if (el) el.textContent = user.username;
        }

        const savedAvatar = localStorage.getItem('userAvatar');
        const avatarDiv = document.querySelector('#profileAvatar');
        
        if (savedAvatar && avatarDiv) {
            avatarDiv.textContent = '';
            avatarDiv.style.backgroundImage = `url('${savedAvatar}')`;
            avatarDiv.classList.add('selected-avatar-style');
        }
        
    } catch (e) {
        console.error("Profile initialization failed", e);
    }
}