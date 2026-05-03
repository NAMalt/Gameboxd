import { AuthManager } from './auth.js';

export class ProfileEditor {
    constructor() {
        this.auth = new AuthManager();
        this.avatarOptions = document.querySelectorAll('.avatar-option');
    }

    init() {
        if (this.avatarOptions.length > 0) {
            this.avatarOptions.forEach(option => {
                option.addEventListener('click', () => this.handleAvatarSelection(option));
            });
        }
    }

    async handleAvatarSelection(element) {
        const selectedAvatarPath = element.getAttribute('data-img');

        if (selectedAvatarPath) {
            const user = await this.auth.getLoggedInUser();

            if (user) {
                user.profilePicture = selectedAvatarPath;
                window.location.href = `profile.html?user=${user.username}`;
            } else {
                alert("No user found.");
                window.location.href = 'login.html';
            }
        }
    }
}