
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       NAVBAR AL HACER SCROLL
    ========================================= */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =========================================
       MENÚ MOBILE
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =========================================
       CERRAR MENÚ AL SELECCIONAR
    ========================================= */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* =========================================
       LINK ACTIVO DEL NAVBAR
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* =========================================
       AÑO AUTOMÁTICO
    ========================================= */

    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }


    /* =========================================
       ANIMACIÓN DE ENTRADA
    ========================================= */

    const animatedElements = document.querySelectorAll(
        ".system-card, .feature, .about-card"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(element);

    });


    /* =========================================
       CLASE SHOW
    ========================================= */

    const style = document.createElement("style");

    style.textContent = `
        .system-card.show,
        .feature.show,
        .about-card.show {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(style);


    /* =========================================
       EFECTO PARALLAX SUAVE DEL DASHBOARD
    ========================================= */

    const dashboard = document.querySelector(".dashboard-card");

    if (dashboard && window.innerWidth > 900) {

        document.addEventListener("mousemove", (event) => {

            const x =
                (window.innerWidth / 2 - event.clientX) / 100;

            const y =
                (window.innerHeight / 2 - event.clientY) / 100;

            dashboard.style.transform = `
                perspective(1000px)
                rotateY(${x * 0.35}deg)
                rotateX(${y * 0.25}deg)
            `;

        });

    }

});