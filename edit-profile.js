document.addEventListener('DOMContentLoaded', () => {
    const avatarOptions = document.querySelectorAll('.avatar-option');

    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedAvatar = this.getAttribute('data-img');

            if (selectedAvatar) {
                localStorage.setItem('userAvatar', selectedAvatar);

                window.location.href = 'profile.html';
            } else {
                console.error("data not found.");
            }
        });
    });
});