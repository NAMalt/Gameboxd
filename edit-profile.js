import { Database } from './auth.js';

export class ProfileEditor {
    constructor() {
        // Store the key as a class property for better maintenance
        this.AVATAR_KEY = 'userAvatar'; 
        this.avatarOptions = document.querySelectorAll('.avatar-option');
    }

    init() {//initializes click options for each of the pictures
        if (this.avatarOptions.length > 0) {
            this.avatarOptions.forEach(option => {
                option.addEventListener('click', () => this.handleAvatarSelection(option));
            });
        }
    }

    async handleAvatarSelection(element) {
        const selectedAvatar = element.getAttribute('data-img');

        if (selectedAvatar) {
            try {
                //saves the selected avatar data and then redirects you to the profile page where it will be rendered
                await Database.save(this.AVATAR_KEY, selectedAvatar);

                // Redirect to profile page after saving
                window.location.href = 'profile.html';
            } catch (error) {
                console.error("failed to save data:", error);
            }
        } else {
            console.error("data not found.");
        }
    }
}