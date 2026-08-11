/* =========================================================
   JK FERRETERÍA
   app.js
   Funcionalidad principal del sitio
========================================================= */

"use strict";


/* =========================================================
   1. CONFIGURACIÓN GENERAL
========================================================= */

/*
 * IMPORTANTE:
 *
 * Cambia únicamente este número cuando tengamos definido
 * el WhatsApp oficial de JK Ferretería.
 *
 * Formato:
 * Colombia = 57 + número
 *
 * Ejemplo:
 * 573229194616
 */

const CONFIG = {

    whatsapp: "573229194616",

    businessName: "JK Ferretería",

    defaultMessage:
        "Hola, JK Ferretería. Estoy interesado en sus productos y quisiera recibir información.",

    messages: {

        general:
            "Hola, JK Ferretería. Estoy interesado en sus productos. ¿Me pueden ayudar con información y una cotización?",

        products:
            "Hola, JK Ferretería. Quiero consultar disponibilidad y precio de algunos productos.",

        tejas:
            "Hola, JK Ferretería. Estoy interesado en tejas. ¿Me pueden informar referencias, disponibilidad y precio?",

        tubos:
            "Hola, JK Ferretería. Estoy interesado en tubos y perfiles. ¿Me pueden ayudar con referencias, disponibilidad y precio?",

        hierros:
            "Hola, JK Ferretería. Estoy interesado en hierros para construcción. ¿Me pueden informar disponibilidad y precio?",

        pinturas:
            "Hola, JK Ferretería. Estoy interesado en pinturas. ¿Me pueden ayudar a elegir el producto adecuado y darme una cotización?",

        soldadura:
            "Hola, JK Ferretería. Estoy interesado en productos y accesorios de soldadura. ¿Me pueden ayudar con una cotización?",

        herramientas:
            "Hola, JK Ferretería. Estoy interesado en herramientas y tornillería. ¿Me pueden informar disponibilidad y precios?",

        andamios:
            "Hola, JK Ferretería. Estoy interesado en alquilar andamios. ¿Me pueden informar disponibilidad, condiciones y precio?",

        parales:
            "Hola, JK Ferretería. Estoy interesado en alquilar parales. ¿Me pueden informar disponibilidad, condiciones y precio?",

        tablones:
            "Hola, JK Ferretería. Estoy interesado en alquilar tablones. ¿Me pueden informar disponibilidad, condiciones y precio?",

        trompos:
            "Hola, JK Ferretería. Estoy interesado en alquilar un trompo para construcción. ¿Me pueden informar disponibilidad, condiciones y precio?"

    }

};


/* =========================================================
   2. ELEMENTOS DEL DOM
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

const currentYear =
    document.getElementById("currentYear");

const siteHeader =
    document.querySelector(".site-header");

const whatsappLinks =
    document.querySelectorAll(".whatsapp-link");


/* =========================================================
   3. WHATSAPP
========================================================= */

/**
 * Genera una URL de WhatsApp.
 *
 * @param {string} message
 * @returns {string}
 */

function createWhatsAppURL(message) {

    const encodedMessage =
        encodeURIComponent(message);

    return `https://wa.me/${CONFIG.whatsapp}?text=${encodedMessage}`;

}


/**
 * Configura todos los enlaces con la clase
 * .whatsapp-link
 */

function setupWhatsAppLinks() {

    whatsappLinks.forEach((link) => {

        link.href =
            createWhatsAppURL(
                CONFIG.defaultMessage
            );

        link.target = "_blank";

        link.rel =
            "noopener noreferrer";

    });

}


/* =========================================================
   4. MENSAJES SEGÚN CATEGORÍA
========================================================= */

/**
 * Permite que un enlace tenga:
 *
 * data-whatsapp="andamios"
 *
 * y automáticamente utilizará el mensaje
 * correspondiente de CONFIG.messages.
 */

function setupCategoryMessages() {

    whatsappLinks.forEach((link) => {

        const category =
            link.dataset.whatsapp;

        if (!category) {
            return;
        }

        const message =
            CONFIG.messages[category];

        if (!message) {
            return;
        }

        link.href =
            createWhatsAppURL(message);

    });

}


/* =========================================================
   5. MENÚ MÓVIL
========================================================= */

function setupMobileMenu() {

    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            const isActive =
                mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isActive)
            );


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isActive
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isActive
                );

            }

        }
    );


    /*
     * Cerrar menú cuando el usuario
     * selecciona una sección.
     */

    const navLinks =
        mainNav.querySelectorAll(
            "a:not(.whatsapp-link)"
        );


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });

}


/**
 * Cierra el menú móvil.
 */

function closeMobileMenu() {

    if (!mainNav || !menuToggle) {
        return;
    }


    mainNav.classList.remove(
        "active"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    const icon =
        menuToggle.querySelector("i");


    if (icon) {

        icon.classList.remove(
            "fa-xmark"
        );

        icon.classList.add(
            "fa-bars"
        );

    }

}


/* =========================================================
   6. HEADER AL HACER SCROLL
========================================================= */

function setupScrollHeader() {

    if (!siteHeader) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 40) {

            siteHeader.classList.add(
                "scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   7. AÑO AUTOMÁTICO DEL FOOTER
========================================================= */

function setupCurrentYear() {

    if (!currentYear) {
        return;
    }


    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   8. CERRAR MENÚ AL HACER CLICK FUERA
========================================================= */

function setupOutsideMenuClick() {

    document.addEventListener(
        "click",
        (event) => {

            if (!mainNav || !menuToggle) {
                return;
            }


            const target =
                event.target;


            if (
                mainNav.classList.contains("active") &&
                !mainNav.contains(target) &&
                !menuToggle.contains(target)
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   9. ESC PARA CERRAR MENÚ
========================================================= */

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mainNav &&
                mainNav.classList.contains("active")
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   10. ANIMACIÓN AL ENTRAR EN PANTALLA
========================================================= */

function setupScrollAnimations() {

    const animatedElements =
        document.querySelectorAll(
            ".category-card, " +
            ".rental-card, " +
            ".highlight-item, " +
            ".contact-card, " +
            ".about-feature"
        );


    /*
     * Si el navegador no soporta
     * IntersectionObserver, simplemente
     * dejamos los elementos visibles.
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(
                    (entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(
        (element) => {

            element.classList.add(
                "animate-on-scroll"
            );

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   11. SCROLL SUAVE PARA ENLACES INTERNOS
========================================================= */

function setupSmoothLinks() {

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        siteHeader
                            ? siteHeader.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );

}


/* =========================================================
   12. BOTONES DE CATEGORÍAS
========================================================= */

/*
 * Asociamos mensajes específicos a las
 * diferentes secciones.
 *
 * Esto permite que posteriormente
 * modifiquemos el HTML simplemente así:
 *
 * class="whatsapp-link"
 * data-whatsapp="tejas"
 */

function setupAutomaticCategoryDetection() {

    const categoryLinks =
        document.querySelectorAll(
            ".category-card .whatsapp-link"
        );


    const categories = [
        "tejas",
        "tubos",
        "hierros",
        "pinturas",
        "soldadura",
        "herramientas"
    ];


    categoryLinks.forEach(
        (link, index) => {

            if (!categories[index]) {
                return;
            }


            link.dataset.whatsapp =
                categories[index];

        }
    );


    const rentalLinks =
        document.querySelectorAll(
            ".rental-card .whatsapp-link"
        );


    const rentalCategories = [
        "andamios",
        "parales",
        "tablones",
        "trompos"
    ];


    rentalLinks.forEach(
        (link, index) => {

            if (!rentalCategories[index]) {
                return;
            }


            link.dataset.whatsapp =
                rentalCategories[index];

        }
    );

}


/* =========================================================
   13. PREVENIR ENLACES VACÍOS
========================================================= */

function preventEmptyLinks() {

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach(
        (link) => {

            /*
             * Si es un enlace de WhatsApp,
             * no hacemos nada porque su
             * URL será configurada después.
             */

            if (
                link.classList.contains(
                    "whatsapp-link"
                )
            ) {

                return;

            }


            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        }
    );

}


/* =========================================================
   14. DETECCIÓN DE ERRORES DE IMÁGENES
========================================================= */

function setupImageFallback() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );

}


/* =========================================================
   15. INICIALIZACIÓN
========================================================= */

function init() {

    setupWhatsAppLinks();

    setupAutomaticCategoryDetection();

    setupCategoryMessages();

    setupMobileMenu();

    setupOutsideMenuClick();

    setupEscapeKey();

    setupScrollHeader();

    setupCurrentYear();

    setupScrollAnimations();

    setupSmoothLinks();

    preventEmptyLinks();

    setupImageFallback();


    console.log(
        "JK Ferretería | Sitio web inicializado correctamente."
    );

}


/* =========================================================
   16. EJECUTAR
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

} else {

    init();

}