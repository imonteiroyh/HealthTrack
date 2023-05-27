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
        localStorage.getItem("sheet") || "styles.css"
    );

    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const form = event.target;
        const url = form.getAttribute('action');
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(formObject),
                headers: {'Content-Type': 'application/json'}
            });

            if (!response.ok) {
                throw new Error('Error sending data');
            }
        } catch (error) {
            console.error('Error sendind data: ', error)
        }
    });
})