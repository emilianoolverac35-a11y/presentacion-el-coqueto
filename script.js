/* =========================================
   EL COQUETO
   SISTEMA DE NAVEGACIÓN DE LA PRESENTACIÓN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS PRINCIPALES
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const progressBar = document.getElementById("progressBar");
    const slideCounter = document.getElementById("slideCounter");

    // CONFIGURACIÓN
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isTransitioning = false;

    // FORMATO DE NÚMEROS
    function formatNumber(number) {
        return String(number).padStart(2, "0");
    }

    // ACTUALIZAR LA PRESENTACIÓN
    function updatePresentation() {

        slides.forEach((slide, index) => {

            if (index === currentSlide) {
                slide.classList.add("active");
                slide.setAttribute("aria-hidden", "false");
            } else {
                slide.classList.remove("active");
                slide.setAttribute("aria-hidden", "true");

                // Pausar videos que estén en diapositivas ocultas
                const video = slide.querySelector("video");

                if (video) {
                    video.pause();
                }
            }

        });

        // ACTUALIZAR CONTADOR
        slideCounter.textContent =
            `${formatNumber(currentSlide + 1)} / ${formatNumber(totalSlides)}`;

        // ACTUALIZAR BARRA DE PROGRESO
        const progress = ((currentSlide + 1) / totalSlides) * 100;

        progressBar.style.width = `${progress}%`;

        // ESTADO DE LOS BOTONES
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;

        prevBtn.style.opacity = currentSlide === 0 ? "0.35" : "1";
        nextBtn.style.opacity =
            currentSlide === totalSlides - 1 ? "0.35" : "1";

    }


    // CAMBIAR DE DIAPOSITIVA
    function goToSlide(index) {

        if (isTransitioning) return;

        if (index < 0 || index >= totalSlides) return;

        if (index === currentSlide) return;

        isTransitioning = true;

        currentSlide = index;

        updatePresentation();

        setTimeout(() => {
            isTransitioning = false;
        }, 700);

    }


    // SIGUIENTE DIAPOSITIVA
    function nextSlide() {

        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }

    }


    // DIAPOSITIVA ANTERIOR
    function previousSlide() {

        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }

    }


    // BOTONES DE NAVEGACIÓN
    nextBtn.addEventListener("click", nextSlide);

    prevBtn.addEventListener("click", previousSlide);


    // NAVEGACIÓN CON TECLADO
    document.addEventListener("keydown", (event) => {

        // Evitar cambiar de diapositiva mientras se usan controles de video
        if (
            event.target.tagName === "VIDEO" ||
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }

        switch (event.key) {

            case "ArrowRight":
            case " ":
            case "PageDown":
                event.preventDefault();
                nextSlide();
                break;

            case "ArrowLeft":
            case "PageUp":
                event.preventDefault();
                previousSlide();
                break;

            case "Home":
                event.preventDefault();
                goToSlide(0);
                break;

            case "End":
                event.preventDefault();
                goToSlide(totalSlides - 1);
                break;

            case "f":
            case "F":
                toggleFullscreen();
                break;

        }

    });


    // PANTALLA COMPLETA
    function toggleFullscreen() {

        if (!document.fullscreenElement) {

            document.documentElement.requestFullscreen().catch(error => {
                console.error("No se pudo activar pantalla completa:", error);
            });

        } else {

            document.exitFullscreen();

        }

    }


    // DOBLE CLIC PARA PANTALLA COMPLETA
    document.addEventListener("dblclick", (event) => {

        if (event.target.closest("video, button")) return;

        toggleFullscreen();

    });


    // INICIALIZAR PRESENTACIÓN
    updatePresentation();

    console.log("Presentación EL COQUETO cargada correctamente.");
    console.log(`Total de diapositivas: ${totalSlides}`);

});