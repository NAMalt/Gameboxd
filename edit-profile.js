import { AuthManager } from './auth.js';

export class ProfileEditor {
    constructor() {
        this.auth = new AuthManager();
        this.avatarOptions = document.querySelectorAll('.avatar-option');
    }//creates the avatar options for the editor

    init() {
        if (this.avatarOptions.length > 0) {
            this.avatarOptions.forEach(option => {
                option.addEventListener('click', () => this.handleAvatarSelection(option));
            });
        }
    }//sets up the event listeners for the avatar options, calling handleAvatarSelection when clicked

    async handleAvatarSelection(element) {
        const selectedAvatarPath = element.getAttribute('data-img');

        if (selectedAvatarPath) {
            // gets user from url
            const user = await this.auth.getLoggedInUser();

            if (user) {
                //update based on class instance
                user.profilePicture = selectedAvatarPath;

                // sends back to profile while keeping the user name in the URL
                window.location.href = `profile.html?user=${user.username}`;
            } else {
                //if ?user= is missing from the address bar
                alert("No user found. Ensure the URL says ?user=" + 
                      (new URLSearchParams(window.location.search).get('user') || "nothing"));
                window.location.href = 'login.html';
            }
        }
    }
}