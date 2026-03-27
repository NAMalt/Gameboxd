import { getLoggedInUser } from "./auth.js";

export function initializeProfilePage() {
    try {
        const user = getLoggedInUser();
        if (user && user.username) {
            const el = document.getElementById('profileUsername');
            if (el) {
                el.textContent = user.username;
            }
        }
    } catch (e) {
        console.error("Profile initialization failed", e);
    }
}