function swapTheme(sheet){
    document.getElementById('theme').setAttribute('href', 'css/' + sheet);
    localStorage.setItem('sheet', sheet);
}

function applyThemeBasedOnRoute() {
    var currentRoute = window.location.pathname;

    if (currentRoute === '/login') {
        swapTheme('styles.css');
    } else {
        swapTheme(localStorage.getItem('sheet') || 'styles.css');
    }
}

function handleLogin(event) {
    const inputUsername = event.target.elements['inputUsername'].value;
    const inputPassword = event.target.elements['inputPassword'].value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({inputUsername, inputPassword})
    })

    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else if (data.error) {
            console.log(data.error);
        }
    })
    .catch(error => {
        console.error('Error: ', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {

    window.onload = applyThemeBasedOnRoute()

    if (typeof document.getElementsByClassName('dropbtn')[0] !== 'undefined') {
        var dropdownBtn = document.getElementsByClassName('dropbtn')[0];
        dropdownBtn.addEventListener('click', function() {
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display == 'block') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block';
            }
        });
    }
})