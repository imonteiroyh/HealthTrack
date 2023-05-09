function swapTheme(sheet){
    document.getElementById('theme').setAttribute('href', 'css/' + sheet);
    localStorage.setItem("sheet", sheet);
}

document.addEventListener('DOMContentLoaded', function() {
    var dropdownBtn = document.getElementsByClassName("dropbtn")[0];
    dropdownBtn.addEventListener("click", function() {
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display == "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });

    window.onload = _ =>
    swapTheme(
        localStorage.getItem("sheet") || "default.css"
    );
})