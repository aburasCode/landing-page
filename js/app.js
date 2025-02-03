document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section');
    const navbar = document.getElementById('navbar');
    const scrollToTop = document.getElementById('scrollToTop');

    // Build Navigation Menu
    const buildNav = () => {
        sections.forEach((section) => {
            if (!document.querySelector(`a[href="#${section.id}"]`)) { // تفادي التكرار
                const li = document.createElement('li');
                li.innerHTML = `<a href="#${section.id}" class="nav-link">${section.querySelector('h2').innerText}</a>`;
                navbar.appendChild(li);
            }
        });
    };

    // Highlight Active Section
    const highlightSection = () => {
        let currentActive = null;
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const navLinks = document.querySelectorAll('.nav-link');
            if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) { 
                currentActive = section;
            }
        });

        if (currentActive) {
            document.querySelectorAll('.nav-link').forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentActive.id}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    // Smooth Scroll
    navbar.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Scroll to Top
    window.addEventListener('scroll', () => {
        highlightSection();
        scrollToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize Functions
    buildNav();
});