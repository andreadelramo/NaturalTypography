document.addEventListener("DOMContentLoaded", () => {
    const variants = ["default-glif", "glif-ss01", "glif-ss02"];
    const userInput = document.getElementById("user-input");
    const styledText = document.getElementById("styled-text");

    function getRandomVariantClass() {
        return variants[Math.floor(Math.random() * variants.length)];
    }

    function styleCharacter(char) {
        const span = document.createElement("span");
        span.textContent = char;

        if (/[a-zA-Z]/.test(char)) {
            const variantClass = getRandomVariantClass(); // Genera una variante aleatoria
            span.classList.add(variantClass);
        } else {
            span.classList.add("default-glif");
        }

        span.classList.add("randomized-char");
        return span;
    }

    userInput.addEventListener("input", () => {
        const inputText = userInput.value;
        const previousTextLength = styledText.childNodes.length;

        if (inputText.length > previousTextLength) {
            const newChar = inputText[inputText.length - 1];
            const styledChar = styleCharacter(newChar); // Aplica el estilo al nuevo carácter
            styledText.appendChild(styledChar);
        } else if (inputText.length < previousTextLength) {
            styledText.removeChild(styledText.lastChild); // Remueve caracteres cuando se borra texto
        }
    });

    // AGRUPAR PALABRAS
    function styleWord(word) {
        const wordContainer = document.createElement("span");
        wordContainer.classList.add("randomized-word");

        for (let char of word) {
            const styledChar = styleCharacter(char); // Reutiliza tu función de estilizado por carácter
            wordContainer.appendChild(styledChar);
        }

        return wordContainer;
    }

    // PROCESA EL TEXTO PARA ESTILIZAR PALABRAS Y CARACTERES
    function processText(element) {
        const text = element.textContent.trim(); // Elimina espacios iniciales y finales
        element.textContent = ""; // Limpia el contenido original

        const words = text.split(/\s+/); // Divide por cualquier cantidad de espacios en blanco
        words.forEach((word, index) => {
            const styledWord = styleWord(word);
            element.appendChild(styledWord);

            // Añadir espacio entre palabras
            if (index < words.length - 1) {
                element.appendChild(document.createTextNode(" "));
            }
        });
    }

    // SELECCIONA LOS ELEMENTOS CON LA CLASE "glifo-text" Y PROCESA SU CONTENIDO
    const glifoTextElements = document.querySelectorAll(".glifo-text");
    glifoTextElements.forEach((element) => processText(element));

    // Exponer la función al ámbito global
    window.processText = processText;

});