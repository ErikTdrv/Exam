const mainElement = document.getElementById('main');
const navElement = document.querySelector('.nav')
if(localStorage.getItem('token')){
    navElement.style.display = 'none'
    console.log('here')
    let spanElement = document.createElement('span');
    spanElement.textContent = 'Welcome to the application!'
    let buttonElement = document.createElement('button');
    buttonElement.textContent = 'Get My Profile Data'
    let logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    mainElement.appendChild(spanElement);
    mainElement.appendChild(buttonElement);
    mainElement.appendChild(logoutButton);
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        location.reload()
        return localStorage.removeItem('token');
    })
}
