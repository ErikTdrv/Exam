document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorSpanElement = document.querySelectorAll('.error')[2]
    const form = e.target;
    const formData = new FormData(form);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    })
    
    const jsonUserData = JSON.stringify(userData)
    
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonUserData
    })
    const data = await response.json();
    if(!data.error){
        localStorage.setItem('token', data.user.accessToken)
        window.location.href = '/client/index.html';
    }else {
        errorSpanElement.textContent = data.errorMessage
    }
})
