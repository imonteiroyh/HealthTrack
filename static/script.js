// // Get the dropdown button
// var dropdownBtn = document.getElementsByClassName("dropbtn")[0];

// // When the user clicks on the button, toggle between showing and hiding the dropdown content
// dropdownBtn.addEventListener("click", function() {
//   var dropdownContent = this.nextElementSibling;
//   if (dropdownContent.style.display === "block") {
//     dropdownContent.style.display = "none";
//   } else {
//     dropdownContent.style.display = "block";
//   }
// });
document.addEventListener('DOMContentLoaded', function() {
    var dropdownBtn = document.getElementsByClassName("dropbtn")[0];
    dropdownBtn.addEventListener("click", function() {
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display == "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    })
})