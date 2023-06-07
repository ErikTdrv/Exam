const registerForm = document.getElementById('register-form');
const usernameElement = registerForm.querySelector('#username');
const emailRegElement = registerForm.querySelector('#email');
const passwordRegElement = registerForm.querySelector('#password');
const repeatPasswordElement = registerForm.querySelector('#re-pass');
const registerLoginSubmitButton = registerForm.querySelector('button[type=submit]');

usernameElement.addEventListener('blur', (e) => {
    const errorElement = registerForm.querySelectorAll('.error')[0];
    if (e.target.value.trim() === '') {
        errorElement.textContent = 'Username is required!';
        registerLoginSubmitButton.disabled = true;
    } else if(e.target.value.length < 4){
        errorElement.textContent = 'Username must be at least 4 characters long!';
        registerLoginSubmitButton.disabled = true;
    } else if(e.target.value.length > 10){
        errorElement.textContent = 'Username must not be longer than 10 characters!';
        registerLoginSubmitButton.disabled = true;
    } else {
        errorElement.textContent = '';
        registerLoginSubmitButton.disabled = false;
    }
});

emailRegElement.addEventListener('blur', (e) => {
    const errorElement = registerForm.querySelectorAll('.error')[1];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailRegElement.value)) {
        errorElement.textContent = 'Email must be valid!';
        registerLoginSubmitButton.disabled = true;
    } else {
        errorElement.textContent = '';
        registerLoginSubmitButton.disabled = false;
    }
});
passwordRegElement.addEventListener('blur', (e) => {
    const errorElement = registerForm.querySelectorAll('.error')[2];
    
    if (e.target.value.length < 6) {
        errorElement.textContent = 'Password must have at least 6 characters!';
        registerLoginSubmitButton.disabled = true;
    } else if (e.target.value.length > 12) {
        errorElement.textContent = 'Password must not have more than 12 characters!';
        registerLoginSubmitButton.disabled = true;
    } else {
        errorElement.textContent = '';
        registerLoginSubmitButton.disabled = false;
    }
});


repeatPasswordElement.addEventListener('change', (e) => {
    const errorElement = registerForm.querySelectorAll('.error')[3];

    if (e.target.value !== passwordRegElement.value) {
        errorElement.textContent = 'Passwords do not match!';
        registerLoginSubmitButton.disabled = true;
    } else {
        errorElement.textContent = '';
        registerLoginSubmitButton.disabled = false;
    }
});
