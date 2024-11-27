document.addEventListener("DOMContentLoaded", () => {
    const p = new SplitText(document.querySelector('.text-intro'), { types: 'chars' });

    // Configuración de caracteres aleatorios para el efecto
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Función para alternar caracteres aleatorios
    function animateCharacter(charElement, correctChar) {
        let scrambleInterval;
        const duration = 1; // Duración total de la animación en segundos
        const intervalSpeed = 50; // Velocidad de cambio en ms
        const totalIterations = Math.floor(duration * 600 / intervalSpeed);

        let currentIteration = 0;

        // Inicia la alternancia de caracteres
        scrambleInterval = setInterval(() => {
            if (currentIteration < totalIterations) {
                // Mostrar un carácter aleatorio
                charElement.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                currentIteration++;
            } else {
                // Finaliza la alternancia y muestra el carácter correcto
                clearInterval(scrambleInterval);
                charElement.textContent = correctChar;
            }
        }, intervalSpeed);
    }

    // Recorrer los caracteres y aplicar la animación
    p.chars.forEach((char, index) => {
        // Retrasar la animación de cada carácter usando stagger
        setTimeout(() => {
            animateCharacter(char, char.textContent);
        }, index * 50); // Ajusta el intervalo entre caracteres
    });
});
