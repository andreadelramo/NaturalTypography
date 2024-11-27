document.addEventListener('DOMContentLoaded', function () {
    // Crear una línea de tiempo para las animaciones
    const tl = gsap.timeline({ paused: true });

    // Ocultar el bloque `.intro`
    tl.to('.intro', {
        duration: 0.5,
        opacity: 0,
        delay: 1,
        onComplete: function () {
            document.querySelector('.intro').style.display = 'none';
        },
    });

    tl.from('header', {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out',
    });

    tl.from('.cursor', {
        duration: 0.5,
        opacity: 0,
        y: -50,
        ease: 'power2.out',
    }, '-=0.3');

   
    tl.from('.section-input', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
    }, '-=0.3'); 

    tl.from('.description-section', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
    }, '-=0.3'); 


    tl.from('.glyph-block', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
    }, '-=0.3'); 

    tl.from('.grid', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
    }, '-=0.3'); 

    tl.from('.text-animation', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
    }, '-=0.3'); 

    tl.from('footer', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
    }, '-=0.3'); 

    // Iniciar la animación al cargar la ventana
    window.addEventListener('load', () => {
        tl.play();
    });
});
