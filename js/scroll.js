document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const sectionNameSpan = document.querySelector('.section-name');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateSectionNameAndLinks = () => {
        let currentSection = '';
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.getAttribute('id');
            }
        });

        // NOMBRE DE LAS SECCIONES -> MOBILE
        if (window.innerWidth <= 768) {
            let newSectionName = '';
            switch (currentSection) {
                case 'tester':
                    newSectionName = 'Tester';
                    break;
                case 'description':
                    newSectionName = 'Description';
                    break;
                case 'glyphs':
                    newSectionName = 'Glyphs';
                    break;
                case 'uses':
                    newSectionName = 'Uses';
                    break;
                default:
                    newSectionName = '';
            }

            if (sectionNameSpan.textContent !== newSectionName) {
                sectionNameSpan.classList.remove('active');
                setTimeout(() => {
                    sectionNameSpan.textContent = newSectionName;
                    if (newSectionName) {
                        sectionNameSpan.classList.add('active'); 
                    }
                }, 300); 
            }
        }

        // ESTADO ACTIVE ->DESKTOP
        if (window.innerWidth > 768) {
            navLinks.forEach((link) => {
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    };

    window.addEventListener('scroll', updateSectionNameAndLinks);
    updateSectionNameAndLinks(); 
});
