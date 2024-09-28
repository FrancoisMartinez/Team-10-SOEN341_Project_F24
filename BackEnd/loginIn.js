document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Clear previous errors
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';

    // Get input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // If valid, submit login data
    if (isValid) {
        















        
        alert('Login successful!');
    }
});
