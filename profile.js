import { AuthManager, Database } from "./auth.js";

export class ProfileApp {//creates profile class, which uses this.auth/your account and it uses your selected picture
    constructor() {
        this.auth = new AuthManager();
        this.AVATAR_KEY = 'userAvatar';
    }

    async render() {//this method is what renders the profile picture
        try {
            const user = await this.auth.getLoggedInUser();//gets the logged user info and stores it in user
            const savedAvatar = await Database.get(this.AVATAR_KEY);//gets the saved avatar from the database/local storage

            if (user && user.username) {//if there is a user and a username, it renders the username on the profile page
                const el = document.getElementById('profileUsername');
                if (el) el.textContent = user.username;
            }

            const avatarDiv = document.querySelector('#profileAvatar');
            
            if (savedAvatar && avatarDiv) {//this if statement checks to see if there is an avatar saved, and removes the string
                //content from the pfp circle
                avatarDiv.textContent = '';
                avatarDiv.style.backgroundImage = `url('${savedAvatar}')`;
                avatarDiv.classList.add('selected-avatar-style');
            }
            
        } catch (e) {
            console.error("render failed:", e);//shows an error is something fails
        }
    }
}