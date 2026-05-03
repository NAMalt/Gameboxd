import { AuthManager } from "./auth.js";

export class ProfileApp {
    constructor() {
        this.auth = new AuthManager();
    }

    async render() {
        try {
            const user = await this.auth.getLoggedInUser();

            if (!user) {
                window.location.href = 'login.html';
                return;
            }

            const nameEl = document.getElementById('profileUsername');
            if (nameEl) nameEl.textContent = user.username;

            const avatarDiv = document.querySelector('#profileAvatar');
            if (avatarDiv) {
                avatarDiv.textContent = ''; 
                avatarDiv.style.backgroundImage = `url('${user.profilePicture}')`;
                avatarDiv.classList.add('selected-avatar-style');
            }

            const editBtn = document.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.href = `edit-profile.html?user=${user.username}`;
            }
            
        } catch (e) {
            console.error("render failed:", e);
        }
    }
}