const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Basic validation for demonstration purposes
    if (username === 'user' && password === 'password') {
        // Redirect to the image search engine page
        window.location.href = 'search.html';
    } else {
        alert('Invalid username or password');
    }
});
