const captcha = document.querySelector('.g-recaptcha');
const errorElement = document.querySelectorAll('.error')[4];

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    })
    if(userData['g-recaptcha-response'] == ''){
        errorElement.textContent = 'Captcha required!!'
        return;
    }else {
        errorElement.textContent = ''
    }
    const jsonUserData = JSON.stringify({username: userData.username, email: userData.email, password: userData.password})
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonUserData
    })
    const data = await response.json();
    if(!data.error){
        localStorage.setItem('token', data.user.accessToken)
        window.location.href = '/index.html';
    }else {
        console.log(data)
        errorElement.textContent = data.errorMessage
    }

})
