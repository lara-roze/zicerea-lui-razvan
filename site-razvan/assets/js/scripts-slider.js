// Sticky navbar functionality
var navbar = document.getElementById("share-link");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.scrollY >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

// Combine scroll events
window.onscroll = function() {
    scrollFunction();
    myFunction();
};