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