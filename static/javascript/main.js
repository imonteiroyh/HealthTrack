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

function displayFlashMessage(message) {
    const flashMessage = document.querySelector('.flash-message');
    flashMessage.textContent = message;
    flashMessage.classList.add('show');

    setTimeout(function() {
        flashMessage.classList.remove('show')
    }, 2000);
}

async function submitForm() {
    const formData = new FormData(document.querySelector('form'));

    var object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    })
    var formJSON = JSON.stringify(object)

    console.log(window.location.href)

    const response = await fetch(window.location.href, {
        method: 'POST',
        body: formJSON,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        if (jsonResponse.message) {
            displayFlashMessage(jsonResponse.message);

            if (jsonResponse.redirect) {
                setTimeout(function() {
                    window.location.href = jsonResponse.redirect;
                }, 1000);
            }

        } else {
            window.location.href = '/';
        }
    } else {
        console.error('Erro ao submeter formulário!')
    }
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

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        submitForm();
    });
})