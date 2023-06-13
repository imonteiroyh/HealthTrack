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

function increaseFontSize() {
    var element = document.getElementById("valueFontSize");
    var size = window.getComputedStyle(element, null).getPropertyValue("font-size");
    var newSize = parseInt(size) + 2;

    localStorage.setItem('fontSize', newSize + 'px');
    applyFontSize();
}

function decreaseFontSize() {
    var element = document.getElementById("valueFontSize");
    var size = window.getComputedStyle(element, null).getPropertyValue("font-size");
    var newSize = parseInt(size) - 2;

    localStorage.setItem('fontSize', newSize + 'px');
    applyFontSize();
}

function applyFontSize() {

    if (localStorage.getItem('fontSize')) {

      var size = localStorage.getItem('fontSize');

      document.body.style.fontSize = size;
    }
}

function clearLocalStorage(){
    localStorage.clear()
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

    const response = await fetch(window.location.href, {
        method: 'POST',
        body: formJSON,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const jsonResponse = await response.json();

        if (jsonResponse.message) {
            if (jsonResponse.message != '') {
                displayFlashMessage(jsonResponse.message);

            }

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
    window.onload = applyFontSize()

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