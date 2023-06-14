const loginForm = document.getElementById('login-form');
const emailElement = loginForm.querySelector('#email');
const passwordElement = loginForm.querySelector('#password');
const loginSubmitButton = loginForm.querySelector('button[type=submit]')


passwordElement.addEventListener('blur', (e) => {
    const errorElement = loginForm.querySelectorAll('.error')[1];
    console.log(errorElement)
    if (e.target.value.length < 6) {
        errorElement.textContent = 'Password must have at least 6 characters!';
        loginSubmitButton.disabled = true;
    } else if (e.target.value.length > 12) {
        errorElement.textContent = 'Password must not have more than 12 characters!';
        loginSubmitButton.disabled = true;
    } else {
        errorElement.textContent = '';
        loginSubmitButton.disabled = false;
    }
})
emailElement.addEventListener('blur', (e) => {
    const errorElement = loginForm.querySelectorAll('.error')[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailElement.value)) {
        errorElement.textContent = 'Email must be valid!';
        loginSubmitButton.disabled = true;
    } else {
        errorElement.textContent = '';
        loginSubmitButton.disabled = false;
    }
})
