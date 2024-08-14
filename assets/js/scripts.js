document.addEventListener('DOMContentLoaded', function () {
    // Side navigation functionality
    const menuToggle = document.getElementById('menuToggle');
    const sidenav = document.getElementById('mySidenav');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.querySelector('.closebtn');

    function openSidenav() {
        sidenav.classList.add('open');
        overlay.classList.add('show');
    }

    function closeSidenav() {
        sidenav.classList.remove('open');
        overlay.classList.remove('show');
    }

    menuToggle.addEventListener('click', openSidenav);
    closeBtn.addEventListener('click', closeSidenav);
    overlay.addEventListener('click', closeSidenav);

    sidenav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeSidenav);
    });

    // Equal heights functionality
    function setEqualHeights() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const items = Array.from(section.querySelectorAll('.news-grid-item'));
            const isMobile = window.matchMedia('(max-width: 767px)').matches;

            // Reset heights to auto
            items.forEach(item => {
                const title = item.querySelector('.titlu-articol');
                const description = item.querySelector('.articol-sumar');

                if (title) title.style.height = 'auto';
                if (description) description.style.height = 'auto';
            });

            // Group items in pairs and calculate the max height for each pair
            for (let i = 0; i < items.length; i += 2) {
                const pair = items.slice(i, i + 2);

                const maxHeights = {
                    title: 0,
                    description: 0
                };

                pair.forEach(item => {
                    const title = item.querySelector('.titlu-articol');
                    const description = item.querySelector('.articol-sumar');

                    if (title) maxHeights.title = Math.max(maxHeights.title, title.scrollHeight);
                    if (description) maxHeights.description = Math.max(maxHeights.description, description.scrollHeight);
                });

                pair.forEach(item => {
                    const title = item.querySelector('.titlu-articol');
                    const description = item.querySelector('.articol-sumar');

                    if (title) title.style.height = `${maxHeights.title}px`;
                    if (description) description.style.height = `${maxHeights.description}px`;
                });
            }
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debouncedSetEqualHeights = debounce(setEqualHeights, 250);
    window.addEventListener('resize', debouncedSetEqualHeights);
    setEqualHeights(); // Set heights on initial load

    // Update date and time
    function updateDateTime() {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        const now = new Date().toLocaleString("ro-RO", options);
        document.getElementById('datetime-display').innerHTML = now;
    }

    updateDateTime();
    setInterval(updateDateTime, 60000);

    // Scroll-to-top button functionality
    let mybutton = document.getElementById("myBtn");

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }

    // Add event listener to the button
    mybutton.addEventListener("click", topFunction);

    // Combine scroll events
    window.onscroll = function() {
        scrollFunction();
    };
});
